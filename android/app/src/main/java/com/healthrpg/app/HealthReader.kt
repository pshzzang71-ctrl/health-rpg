package com.healthrpg.app

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.ExerciseSessionRecord
import androidx.health.connect.client.records.SleepSessionRecord
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import org.json.JSONObject
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter

/**
 * 헬스 커넥트에서 하루치 기록을 읽어 JSON 문자열로 돌려줍니다.
 * 삼성 헬스(갤럭시 핏)가 헬스 커넥트로 공유한 데이터를 읽습니다. 데이터는 휴대폰 밖으로 보내지 않습니다.
 */
class HealthReader(private val context: Context) {

    companion object {
        val STEPS = HealthPermission.getReadPermission(StepsRecord::class)
        val SLEEP = HealthPermission.getReadPermission(SleepSessionRecord::class)
        val EXERCISE = HealthPermission.getReadPermission(ExerciseSessionRecord::class)
        val PERMISSIONS = setOf(STEPS, SLEEP, EXERCISE)
        private const val PROVIDER = "com.google.android.apps.healthdata"
    }

    fun status(): String = when (HealthConnectClient.getSdkStatus(context, PROVIDER)) {
        HealthConnectClient.SDK_AVAILABLE -> "available"
        HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED -> "update_required"
        else -> "not_installed"
    }

    private fun client(): HealthConnectClient? =
        if (status() == "available") HealthConnectClient.getOrCreate(context) else null

    suspend fun permissionJson(): String {
        val out = JSONObject()
        val c = client() ?: return out.put("granted", false).put("status", status()).toString()
        return try {
            val g = c.permissionController.getGrantedPermissions()
            out.put("granted", g.containsAll(PERMISSIONS))
                .put("steps", g.contains(STEPS))
                .put("sleep", g.contains(SLEEP))
                .put("exercise", g.contains(EXERCISE))
                .toString()
        } catch (e: Exception) {
            out.put("granted", false).put("error", e.message ?: "error").toString()
        }
    }

    /** dateStr: "2026-11-09" 형식의 게임 날짜 */
    suspend fun readDay(dateStr: String): String {
        val out = JSONObject().put("date", dateStr)
        val c = client() ?: return out.put("error", "unavailable").toString()
        try {
            val zone = ZoneId.systemDefault()
            val date = LocalDate.parse(dateStr)
            val start = date.atStartOfDay(zone).toInstant()
            val dayEnd = date.plusDays(1).atStartOfDay(zone).toInstant()
            val now = Instant.now()
            val end = if (dayEnd.isAfter(now)) now else dayEnd
            val granted = c.permissionController.getGrantedPermissions()

            // 걸음 수: 그날 0시부터 지금(또는 그날 끝)까지 합계
            if (granted.contains(STEPS) && end.isAfter(start)) {
                val agg = c.aggregate(
                    AggregateRequest(setOf(StepsRecord.COUNT_TOTAL), TimeRangeFilter.between(start, end))
                )
                out.put("steps", agg[StepsRecord.COUNT_TOTAL] ?: 0L)
            }

            // 운동 시간: 그날 기록된 운동 세션 시간 합계(분)
            if (granted.contains(EXERCISE) && end.isAfter(start)) {
                val res = c.readRecords(
                    ReadRecordsRequest(ExerciseSessionRecord::class, TimeRangeFilter.between(start, end))
                )
                var mins = 0L
                for (r in res.records) mins += Duration.between(r.startTime, r.endTime).toMinutes()
                out.put("exerciseMin", mins)
            }

            // 수면: 전날 18시 ~ 당일 18시 사이의 가장 긴 수면 → 잠든 시각
            if (granted.contains(SLEEP)) {
                val sStart = date.minusDays(1).atTime(18, 0).atZone(zone).toInstant()
                val sEnd = date.atTime(18, 0).atZone(zone).toInstant()
                val res = c.readRecords(
                    ReadRecordsRequest(SleepSessionRecord::class, TimeRangeFilter.between(sStart, sEnd))
                )
                val main = res.records.maxByOrNull { Duration.between(it.startTime, it.endTime).toMinutes() }
                if (main != null) {
                    val fmt = DateTimeFormatter.ofPattern("HH:mm")
                    out.put("bedtime", main.startTime.atZone(zone).toLocalTime().format(fmt))
                    out.put("wake", main.endTime.atZone(zone).toLocalTime().format(fmt))
                    out.put("sleepMin", Duration.between(main.startTime, main.endTime).toMinutes())
                }
            }
        } catch (e: Exception) {
            out.put("error", e.message ?: e.javaClass.simpleName)
        }
        return out.toString()
    }

    /** 헬스 커넥트 설정 화면 열기. 없으면 Play 스토어로 */
    fun openSettings(ctx: Context) {
        val actions = if (Build.VERSION.SDK_INT >= 34) {
            listOf("android.health.connect.action.HEALTH_HOME_SETTINGS", "androidx.health.ACTION_HEALTH_CONNECT_SETTINGS")
        } else {
            listOf("androidx.health.ACTION_HEALTH_CONNECT_SETTINGS")
        }
        for (a in actions) {
            try {
                ctx.startActivity(Intent(a).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
                return
            } catch (_: Exception) {
            }
        }
        try {
            ctx.startActivity(
                Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$PROVIDER"))
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            )
        } catch (_: Exception) {
        }
    }
}
