package com.healthrpg.app

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.ActivityNotFoundException
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.text.InputType
import android.text.TextUtils
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.health.connect.client.PermissionController
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import org.json.JSONObject

/**
 * 건강 RPG 앱.
 * 게임 화면은 Vercel에 올린 웹 게임을 그대로 띄우고(업데이트는 Vercel에 올리기만 하면 됨),
 * 이 앱은 헬스 커넥트(삼성 헬스·갤럭시 핏 기록)를 읽어서 게임에 전달하는 역할만 합니다.
 */
class MainActivity : ComponentActivity() {

    companion object {
        const val APP_VERSION = "1.0"
        private const val BG = "#BFE6FF"
    }

    private lateinit var webView: WebView
    private lateinit var health: HealthReader
    private var fileCallback: ValueCallback<Array<Uri>>? = null
    private var gameUrl: String = ""

    private val permissionLauncher = registerForActivityResult(
        PermissionController.createRequestPermissionResultContract()
    ) { granted ->
        val all = granted.containsAll(HealthReader.PERMISSIONS)
        val any = granted.isNotEmpty()
        runJs("window.__hbPerm && window.__hbPerm($all, $any)")
    }

    private val fileLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val uris = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        fileCallback?.onReceiveValue(uris)
        fileCallback = null
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.light(Color.TRANSPARENT, Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.light(Color.TRANSPARENT, Color.TRANSPARENT)
        )
        super.onCreate(savedInstanceState)
        health = HealthReader(this)

        val root = FrameLayout(this)
        root.setBackgroundColor(Color.parseColor(BG))
        webView = WebView(this)
        webView.setBackgroundColor(Color.parseColor(BG))
        root.addView(
            webView,
            FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        )
        setContentView(root)

        // 상태 표시줄·내비게이션 바·키보드에 화면이 가리지 않도록 여백 적용
        ViewCompat.setOnApplyWindowInsetsListener(root) { v, insets ->
            val bars = insets.getInsets(
                WindowInsetsCompat.Type.systemBars() or
                    WindowInsetsCompat.Type.displayCutout() or
                    WindowInsetsCompat.Type.ime()
            )
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }

        val s = webView.settings
        s.javaScriptEnabled = true
        s.domStorageEnabled = true
        s.mediaPlaybackRequiresUserGesture = true
        s.setSupportZoom(false)
        s.userAgentString = s.userAgentString + " HealthRPGApp/" + APP_VERSION

        webView.addJavascriptInterface(Bridge(), "HealthBridge")
        webView.webViewClient = GameClient()
        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                view: WebView?,
                callback: ValueCallback<Array<Uri>>?,
                params: FileChooserParams?
            ): Boolean {
                fileCallback?.onReceiveValue(null)
                fileCallback = callback
                return try {
                    fileLauncher.launch(params!!.createIntent())
                    true
                } catch (e: Exception) {
                    fileCallback = null
                    false
                }
            }
        }

        // 뒤로가기: 게임 안의 창을 먼저 닫고, 더 닫을 게 없으면 앱 종료
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                webView.evaluateJavascript("(window.__onBack && window.__onBack()) ? 'y' : 'n'") { r ->
                    if (r == null || !r.contains("y")) {
                        if (webView.canGoBack()) webView.goBack() else finish()
                    }
                }
            }
        })

        gameUrl = savedUrl()
        if (gameUrl.isEmpty()) askUrl(first = true) else webView.loadUrl(gameUrl)
    }

    override fun onResume() {
        super.onResume()
        if (::webView.isInitialized) webView.onResume()
    }

    override fun onPause() {
        if (::webView.isInitialized) webView.onPause()
        super.onPause()
    }

    // ---------- 게임 주소 ----------

    private fun prefs() = getSharedPreferences("healthrpg", Context.MODE_PRIVATE)

    private fun savedUrl(): String {
        val saved = prefs().getString("game_url", null)
        if (!saved.isNullOrBlank()) return saved
        return getString(R.string.game_url).trim()
    }

    private fun askUrl(first: Boolean) {
        val input = EditText(this)
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
        input.setText(if (gameUrl.isNotEmpty()) gameUrl else "https://")
        input.setSelection(input.text.length)
        val pad = (20 * resources.displayMetrics.density).toInt()
        val box = FrameLayout(this)
        box.setPadding(pad, pad / 2, pad, 0)
        box.addView(input)

        val dialog = AlertDialog.Builder(this)
            .setTitle("게임 주소 입력")
            .setMessage("Vercel에 올린 건강 RPG 주소를 입력하세요.\n예: https://health-rpg-v2.vercel.app")
            .setView(box)
            .setCancelable(!first)
            .setPositiveButton("확인") { _, _ ->
                var url = input.text.toString().trim()
                if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://$url"
                url = url.trimEnd('/') + "/"
                val host = Uri.parse(url).host ?: ""
                if (host.isBlank()) {
                    askUrl(first)
                } else if (host == "vercel.com" || host.endsWith(".vercel.com")) {
                    // 관리 화면 주소를 넣은 경우: 실제 게임 주소(○○.vercel.app)를 다시 묻는다
                    AlertDialog.Builder(this)
                        .setMessage("이 주소는 Vercel 관리 화면이에요.\n프로젝트 화면의 Domains에 있는 ○○○.vercel.app 주소를 넣어 주세요.")
                        .setPositiveButton("다시 입력") { _, _ -> askUrl(first) }
                        .setCancelable(false)
                        .show()
                } else {
                    prefs().edit().putString("game_url", url).apply()
                    gameUrl = url
                    webView.loadUrl(url)
                }
            }
        if (!first) dialog.setNegativeButton("취소", null)
        dialog.show()
    }

    // ---------- 화면 이동 처리 ----------

    private inner class GameClient : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
            val url = request.url
            val scheme = url.scheme ?: ""
            if (scheme == "intent") {
                openIntentUrl(url.toString())
                return true
            }
            if (scheme == "http" || scheme == "https") {
                val gameHost = Uri.parse(gameUrl).host
                if (gameHost != null && url.host == gameHost) return false
            }
            // 게임 밖 링크는 브라우저나 해당 앱으로 연다
            try {
                startActivity(Intent(Intent.ACTION_VIEW, url))
            } catch (_: ActivityNotFoundException) {
            }
            return true
        }

        override fun onReceivedError(view: WebView, request: WebResourceRequest, error: WebResourceError) {
            if (request.isForMainFrame) showOffline()
        }
    }

    private fun openIntentUrl(raw: String) {
        try {
            val intent = Intent.parseUri(raw, Intent.URI_INTENT_SCHEME)
            val pkg = intent.`package`
            val launch = if (pkg != null) packageManager.getLaunchIntentForPackage(pkg) else null
            when {
                launch != null -> startActivity(launch)
                pkg != null -> startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$pkg")))
                else -> startActivity(intent)
            }
        } catch (_: Exception) {
        }
    }

    private fun showOffline() {
        val btn = "display:block;width:100%;margin:12px 0;padding:14px;border-radius:16px;border:2px solid #e57a00;" +
            "background:#ff9a1f;color:#fff;font-size:16px;font-weight:700;box-shadow:0 4px 0 #c25e00"
        val html = """
            <html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
            <body style="background:linear-gradient(#5cb8ff,#e3f5ff);min-height:100vh;margin:0;color:#4b3526;font-family:sans-serif;text-align:center;padding:60px 24px;box-sizing:border-box">
            <div style="font-size:56px">📡</div>
            <h2>게임을 불러오지 못했어요</h2>
            <p style="color:#6b5a4c">처음 한 번은 인터넷 연결이 필요해요.<br>연결을 확인한 뒤 다시 시도해 주세요.</p>
            <button style="$btn" onclick="HealthBridge.reload()">다시 시도</button>
            <button style="$btn;background:#fffaf0;color:#6b4320;border-color:#d9b27c;box-shadow:0 4px 0 #c99a5f" onclick="HealthBridge.changeGameUrl()">게임 주소 바꾸기</button>
            <p style="color:#6b5a4c;font-size:12px">주소: ${TextUtils.htmlEncode(gameUrl)}</p>
            </body></html>
        """.trimIndent()
        webView.loadDataWithBaseURL(null, html, "text/html", "utf-8", null)
    }

    // ---------- 게임 ↔ 앱 연결 ----------

    private fun runJs(code: String) {
        webView.post { webView.evaluateJavascript(code, null) }
    }

    private fun resolve(cbId: String, json: String) {
        runJs("window.__hbResolve && window.__hbResolve(${JSONObject.quote(cbId)}, $json)")
    }

    @Suppress("DEPRECATION")
    private fun vibrator(): Vibrator =
        if (Build.VERSION.SDK_INT >= 31) {
            getSystemService(VibratorManager::class.java).defaultVibrator
        } else {
            getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }

    private inner class Bridge {
        @JavascriptInterface
        fun appVersion(): String = APP_VERSION

        @JavascriptInterface
        fun getStatus(): String = health.status()

        @JavascriptInterface
        fun requestPermissions() {
            runOnUiThread {
                try {
                    permissionLauncher.launch(HealthReader.PERMISSIONS)
                } catch (e: Exception) {
                    runJs("window.__hbPerm && window.__hbPerm(false, false)")
                }
            }
        }

        @JavascriptInterface
        fun checkPermissions(cbId: String) {
            runOnUiThread { lifecycleScope.launch { resolve(cbId, health.permissionJson()) } }
        }

        @JavascriptInterface
        fun readDay(date: String, cbId: String) {
            runOnUiThread { lifecycleScope.launch { resolve(cbId, health.readDay(date)) } }
        }

        @JavascriptInterface
        fun openHealthConnect() {
            runOnUiThread { health.openSettings(this@MainActivity) }
        }

        @JavascriptInterface
        fun copyText(text: String) {
            runOnUiThread {
                val cm = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                cm.setPrimaryClip(ClipData.newPlainText("건강 RPG 백업", text))
            }
        }

        @JavascriptInterface
        fun vibrate(ms: Int) {
            try {
                val d = ms.coerceIn(5, 600).toLong()
                vibrator().vibrate(VibrationEffect.createOneShot(d, VibrationEffect.DEFAULT_AMPLITUDE))
            } catch (_: Exception) {
            }
        }

        @JavascriptInterface
        fun changeGameUrl() {
            runOnUiThread { askUrl(first = false) }
        }

        @JavascriptInterface
        fun reload() {
            runOnUiThread { if (gameUrl.isNotEmpty()) webView.loadUrl(gameUrl) else askUrl(first = true) }
        }
    }
}
