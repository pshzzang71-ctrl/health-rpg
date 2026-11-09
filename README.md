# 건강 RPG

매일 건강 목표를 달성하며 레벨업하는 개인용 RPG.

- `web/` — 게임 본체. Vercel 프로젝트(healthrpg_ver2.1)가 이 폴더를 배포합니다. 주소: https://healthrpgver21.vercel.app
- `android/` — 안드로이드 앱(게임 화면 + 헬스 커넥트로 갤럭시 핏 기록 읽기).
  이 폴더가 바뀌면 GitHub Actions가 APK를 자동으로 만들어 **Releases → latest** 에 올립니다.

## 휴대폰에 앱 설치
1. 이 저장소의 Releases → latest → `health-rpg.apk` 를 내려받습니다.
2. 파일을 열고 '출처를 알 수 없는 앱 설치'를 허용한 뒤 설치합니다.
3. 새 버전이 나오면 같은 방법으로 덮어 설치하면 기록이 유지됩니다.

※ `android/app/healthrpg-key.p12` 는 앱 서명 키입니다. 지우거나 바꾸면 덮어 설치가 안 됩니다.
