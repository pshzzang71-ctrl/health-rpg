package com.healthrpg.app

import android.graphics.Color
import android.os.Bundle
import android.widget.ScrollView
import android.widget.TextView
import androidx.activity.ComponentActivity

/** 헬스 커넥트 권한 화면에서 보여 주는 '데이터 사용 안내' */
class PrivacyActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val pad = (24 * resources.displayMetrics.density).toInt()
        val text = TextView(this)
        text.text = """
            건강 데이터 사용 안내

            건강 RPG는 헬스 커넥트에서 아래 기록을 읽어 게임 퀘스트를 자동으로 체크하는 데만 사용합니다.

            • 걸음 수: 걷기 퀘스트 달성 여부
            • 수면: 어젯밤 잠든 시각 (수면 퀘스트)
            • 운동: 오늘 운동한 시간 (운동 퀘스트)

            읽은 기록은 이 휴대폰 밖으로 보내지 않으며, 다른 곳에 저장하거나 공유하지 않습니다.
            게임 기록도 이 휴대폰 안에만 저장됩니다.

            권한은 언제든 헬스 커넥트 설정에서 끌 수 있습니다.
        """.trimIndent()
        text.setTextColor(Color.parseColor("#4B3526"))
        text.textSize = 16f
        text.setLineSpacing(0f, 1.3f)
        text.setPadding(pad, pad * 3, pad, pad)
        val scroll = ScrollView(this)
        scroll.setBackgroundColor(Color.parseColor("#FFFAF0"))
        scroll.addView(text)
        setContentView(scroll)
    }
}
