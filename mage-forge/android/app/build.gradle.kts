plugins {
    id("com.android.application")
}

android {
    namespace = "com.mageforge.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.mageforge.app"
        minSdk = 26
        targetSdk = 36
        // GitHub에서 빌드할 때마다 번호가 올라가서, 새 APK를 기존 앱 위에 덮어 설치할 수 있습니다(기록 유지).
        versionCode = (System.getenv("GITHUB_RUN_NUMBER") ?: "1").toInt()
        versionName = "3.0"
    }

    // 프로젝트에 들어 있는 서명 키를 씁니다. 이 키 파일(mageforge-key.p12)은 지우거나 바꾸지 마세요.
    signingConfigs {
        create("shared") {
            storeFile = file("mageforge-key.p12")
            storePassword = "mageforge2026"
            keyAlias = "mageforge"
            keyPassword = "mageforge2026"
            storeType = "PKCS12"
        }
    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("shared")
        }
        getByName("release") {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("shared")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.activity:activity-ktx:1.13.0")
    implementation("androidx.core:core-ktx:1.16.0")
    implementation("androidx.webkit:webkit:1.12.1")
}
