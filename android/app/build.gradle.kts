plugins {
    id("com.android.application")
}

android {
    namespace = "com.healthrpg.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.healthrpg.app"
        minSdk = 28
        targetSdk = 36
        versionCode = 2
        versionName = "1.1"
    }

    // 프로젝트에 들어 있는 서명 키를 씁니다.
    // 어느 PC에서 빌드해도 서명이 같아서, 새로 빌드한 앱을 기존 앱 위에 덮어 설치할 수 있습니다(기록 유지).
    // 이 키 파일(healthrpg-key.p12)은 지우거나 바꾸지 마세요.
    signingConfigs {
        create("shared") {
            storeFile = file("healthrpg-key.p12")
            storePassword = "healthrpg2026"
            keyAlias = "healthrpg"
            keyPassword = "healthrpg2026"
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
    implementation("androidx.health.connect:connect-client:1.1.0")
}
