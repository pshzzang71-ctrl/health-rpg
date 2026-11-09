/* 건강 RPG 코스튬 목록
 * ─────────────────────────────────────────────────────────────
 * 새 코스튬은 이 배열 맨 아래에 추가하세요. (게임 코드는 건드릴 필요 없음)
 *
 * 필드
 *  id       영문 소문자·숫자·_ (겹치면 안 됨)
 *  name     이름 (한글, 10자 안팎)
 *  price    가격(G)  — rarity 0: 300~700 · 1: 900~1500 · 2: 2000~3000
 *  rarity   0 일반 · 1 희귀 · 2 전설
 *  added    추가한 날짜 'YYYY-MM-DD' (7일 동안 상점에 NEW 표시)
 *  desc     한 줄 설명
 *  trend    (선택) 참고한 트렌드 한 줄
 *  body/belt/legs/hair  색상 (#rrggbb). 생략하면 직업 기본색
 *  back     몸 뒤 (망토·후드 뒤판·배경 반짝이)
 *  shoes    다리 위 (신발)
 *  over     몸통 위 (무늬·카라·주머니)
 *  side     손에 든 물건 (오른쪽 x≈80) — 넣으면 직업 무기 대신 보여요
 *  mask     눈 아래 (가면)
 *  face     눈 위 (안경·마이크·수염)
 *  hat      맨 위 (모자·귀·머리핀) — 넣으면 직업 모자 대신 보여요
 *  noHair   true면 머리카락을 그리지 않음
 *
 * 좌표 (viewBox 0 -10 100 110)
 *  머리 원 (50,40) r26 · 앞머리 y13~41 · 눈 (41,44.5)(59,44.5) · 볼 (34,51.5)(66,51.5) · 입 y52~56
 *  몸통 x32.5~67.5 y59~85 (턱이 y66까지 가려요 → 가슴 무늬는 y66~82)
 *  허리띠 y72~76.5 · 손 (31,68)(69,68) r5.8 · 다리 x38~47.5, 52.5~62 y82~92 · 그림자 y95
 *  SVG 안에 id 속성은 쓰지 마세요 (한 화면에 캐릭터가 여러 번 그려져요)
 */
window.HRPG_COSTUMES = [
 {id:'bear_hood',name:'곰돌이 후드',price:500,rarity:0,added:'2026-11-09',desc:'곰 귀가 달린 포근한 후드. 쌀쌀한 날 산책 필수템',
  body:'#b07a4f',belt:'#b07a4f',
  back:`<circle cx="50" cy="38" r="30.5" fill="#b07a4f"/><circle cx="26" cy="15" r="8.5" fill="#b07a4f"/><circle cx="74" cy="15" r="8.5" fill="#b07a4f"/><circle cx="26" cy="15" r="4.5" fill="#f2c9a0"/><circle cx="74" cy="15" r="4.5" fill="#f2c9a0"/>`,
  over:`<rect x="40" y="74" width="20" height="8.5" rx="4" fill="#9a6a42"/><path d="M45.5 65 v6.5 M54.5 65 v6.5" stroke="#f6eadb" stroke-width="1.6" stroke-linecap="round"/><circle cx="45.5" cy="72" r="1.4" fill="#f6eadb"/><circle cx="54.5" cy="72" r="1.4" fill="#f6eadb"/>`,
  hat:`<path d="M24 34 C26 18 37 10 50 10 C63 10 74 18 76 34 C70 22 60 17 50 17 C40 17 30 22 24 34Z" fill="#c28a5c"/>`},

 {id:'bunny_pj',name:'토끼 잠옷',price:400,rarity:0,added:'2026-11-09',desc:'일찍 자는 모험가를 위한 말랑말랑 수면 잠옷',
  body:'#ffd6e7',belt:'#ffd6e7',legs:'#ffc2d8',
  over:`<path d="M50 66 v18" stroke="#f3a6c4" stroke-width="1"/><g fill="#fff"><circle cx="39" cy="70" r="1.9"/><circle cx="44" cy="79" r="1.9"/><circle cx="58" cy="69" r="1.9"/><circle cx="61" cy="79" r="1.9"/><circle cx="53.5" cy="75" r="1.4"/></g>`,
  hat:`<path d="M37 19 C31 4 33 -7 39 -7 C45 -7 46 5 44 18Z" fill="#fff" stroke="#f3b5cc" stroke-width="1.4"/><path d="M38.5 16 C35 6 36 -3 39 -3 C42 -3 42.5 6 41.5 16Z" fill="#ffc2d8"/><path d="M56 18 C55 5 57 -7 63 -7 C69 -7 68 5 62 19Z" fill="#fff" stroke="#f3b5cc" stroke-width="1.4"/><path d="M58.5 16 C58 7 59.5 -3 62 -3 C65 -3 64 6 61 16Z" fill="#ffc2d8"/><path d="M27 27 Q50 12 73 27" stroke="#ffb0cc" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  side:`<path d="M83 58 l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="#ffe680" stroke="#f0c419" stroke-width="1.2" stroke-linejoin="round"/><circle cx="81.3" cy="66.5" r=".8" fill="#8a6a00"/><circle cx="84.7" cy="66.5" r=".8" fill="#8a6a00"/>`},

 {id:'run_crew',name:'러닝 크루',price:600,rarity:0,added:'2026-11-09',desc:'배번 달고 달리는 주말 러닝 크루 룩',trend:'러닝 크루 · 러닝코어',
  body:'#36cfc0',belt:'#1f2a44',legs:'#1f2a44',
  shoes:`<rect x="36" y="88" width="13" height="5.5" rx="2.7" fill="#ff7a3d"/><rect x="51" y="88" width="13" height="5.5" rx="2.7" fill="#ff7a3d"/><path d="M38 91 h9 M53 91 h9" stroke="#fff" stroke-width="1.2"/>`,
  over:`<path d="M32.5 76 H67.5 V78 C67.5 82 64 85 60 85 H40 C36 85 32.5 82 32.5 78Z" fill="#1f2a44"/><rect x="41" y="65.5" width="18" height="9.5" rx="2" fill="#fff" stroke="#d0d7de" stroke-width=".8"/><text x="50" y="72.8" font-size="7" text-anchor="middle" font-family="sans-serif" font-weight="800" fill="#e0546a">26</text><path d="M34 63 L39 60 M66 63 L61 60" stroke="#fff" stroke-width="1.4"/>`,
  hat:`<rect x="24.3" y="25.5" width="51.4" height="5.6" rx="2.8" fill="#ff5d73"/><path d="M73 28 l8 -3 l-1.5 5.5z" fill="#ff5d73"/>`,
  side:`<rect x="26.5" y="69.5" width="9" height="3.6" rx="1.6" fill="#1f2a44"/><rect x="29.3" y="69.9" width="3.4" height="2.8" rx=".8" fill="#7df9c3"/>`},

 {id:'knit_beanie',name:'니트 & 비니',price:550,rarity:0,added:'2026-11-09',desc:'겨자색 니트에 목도리, 방울 비니까지',trend:'코지 니트웨어',
  body:'#f2a541',belt:'#d98a2b',
  over:`<path d="M34 68 l4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3" stroke="#fff4dc" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M38 61 Q50 69 62 61 L63 65.5 Q50 73 37 65.5Z" fill="#e8546c"/><rect x="55" y="65" width="6.5" height="14" rx="2.5" fill="#e8546c"/><path d="M56 79 v3 M58.3 79 v3 M60.6 79 v3" stroke="#e8546c" stroke-width="1.2"/>`,
  hat:`<path d="M24.5 33 C24.5 15 36 8 50 8 C64 8 75.5 15 75.5 33Z" fill="#5b8def"/><rect x="23" y="28" width="54" height="8.5" rx="4.2" fill="#4372d4"/><path d="M29 29 v6.5 M35 29 v6.5 M41 29 v6.5 M47 29 v6.5 M53 29 v6.5 M59 29 v6.5 M65 29 v6.5 M71 29 v6.5" stroke="#3561bf" stroke-width="1.3"/><circle cx="50" cy="6" r="6" fill="#fff"/><circle cx="48" cy="4.5" r="2" fill="#eef4ff"/>`},

 {id:'summer_trip',name:'여름 휴가',price:450,rarity:0,added:'2026-11-09',desc:'꽃무늬 셔츠와 밀짚모자, 선글라스로 휴가 모드',
  body:'#3fc1e8',belt:'#3fc1e8',legs:'#ffe2c6',
  shoes:`<rect x="36.5" y="90" width="12.5" height="3.2" rx="1.6" fill="#ff70a6"/><rect x="51" y="90" width="12.5" height="3.2" rx="1.6" fill="#ff70a6"/>`,
  over:`<path d="M32.5 77 H67.5 V78 C67.5 82 64 85 60 85 H40 C36 85 32.5 82 32.5 78Z" fill="#ffd166"/><path d="M42 61 L50 69 L58 61Z" fill="#fff" opacity=".9"/><g fill="#ff70a6"><circle cx="38" cy="70" r="2.6"/><circle cx="62" cy="73" r="2.6"/><circle cx="46" cy="74" r="2.2"/></g><g fill="#ffe066"><circle cx="38" cy="70" r="1"/><circle cx="62" cy="73" r="1"/><circle cx="46" cy="74" r=".9"/></g><g fill="#2a9d8f"><ellipse cx="42" cy="68" rx="2.4" ry="1.2" transform="rotate(30 42 68)"/><ellipse cx="57" cy="70" rx="2.4" ry="1.2" transform="rotate(-30 57 70)"/></g>`,
  hat:`<ellipse cx="50" cy="25" rx="35" ry="7.5" fill="#f2cc8f" stroke="#d9a75e" stroke-width="1.2"/><path d="M33 25 C33 10 67 10 67 25Z" fill="#e9c46a" stroke="#d9a75e" stroke-width="1.2"/><rect x="33" y="19.5" width="34" height="4.5" fill="#e76f51"/>`,
  face:`<rect x="34.5" y="40" width="13" height="8.5" rx="4" fill="#1d3557"/><rect x="52.5" y="40" width="13" height="8.5" rx="4" fill="#1d3557"/><path d="M47.5 43.5 h5" stroke="#1d3557" stroke-width="1.8"/><path d="M37 42.5 l3.5 -1.2 M55 42.5 l3.5 -1.2" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`,
  side:`<circle cx="83" cy="75" r="7" fill="#fff" stroke="#e0e0e0" stroke-width=".8"/><path d="M83 68 a7 7 0 0 1 7 7 h-7z" fill="#ef476f"/><path d="M83 82 a7 7 0 0 1 -7 -7 h7z" fill="#118ab2"/><path d="M76 75 a7 7 0 0 1 7 -7 v7z" fill="#ffd166"/>`},

 {id:'taekwondo',name:'태권도복',price:900,rarity:1,added:'2026-11-09',desc:'검은 띠의 기합! 몸도 마음도 단단하게',
  body:'#ffffff',belt:'#222222',legs:'#f6f6f6',
  shoes:`<rect x="38" y="82" width="9.5" height="10" rx="4.5" fill="none" stroke="#d9dee4" stroke-width="1"/><rect x="52.5" y="82" width="9.5" height="10" rx="4.5" fill="none" stroke="#d9dee4" stroke-width="1"/>`,
  over:`<rect x="32.5" y="59" width="35" height="26" rx="12" fill="none" stroke="#d9dee4" stroke-width="1.2"/><path d="M41 61 L50 71 L59 61" stroke="#222" stroke-width="2.6" fill="none" stroke-linejoin="round"/><path d="M48 76 l-4 8 M52 76 l4 8" stroke="#222" stroke-width="3" stroke-linecap="round"/><rect x="46.5" y="72" width="7" height="5" rx="1.5" fill="#222"/>`},

 {id:'chef',name:'셰프복',price:1000,rarity:1,added:'2026-11-09',desc:'건강 집밥 마스터. 채소 반찬은 내가 책임진다',
  body:'#ffffff',belt:'#ffffff',legs:'#3d405b',
  over:`<rect x="32.5" y="59" width="35" height="26" rx="12" fill="none" stroke="#d9dee4" stroke-width="1.2"/><path d="M41 61 Q50 67 59 61 L56 66 Q50 69 44 66Z" fill="#e63946"/><path d="M50 67 l-2.5 5 h5z" fill="#e63946"/><g fill="#adb5bd"><circle cx="43" cy="70" r="1.3"/><circle cx="57" cy="70" r="1.3"/><circle cx="43" cy="74.5" r="1.3"/><circle cx="57" cy="74.5" r="1.3"/></g><path d="M37 77 H63 V84 Q50 87 37 84Z" fill="#f1f3f5" stroke="#d9dee4" stroke-width=".8"/>`,
  hat:`<path d="M29 30 C21 24 26 9 36 12 C38 3 50 0 54 8 C61 2 75 9 71 21 C76 25 73 30 71 30Z" fill="#fff" stroke="#d9dee4" stroke-width="1.4" stroke-linejoin="round"/><rect x="28.5" y="25" width="43" height="9" rx="2.5" fill="#fff" stroke="#d9dee4" stroke-width="1.4"/>`,
  side:`<rect x="81" y="52" width="3.2" height="25" rx="1.6" fill="#a0522d"/><rect x="77.5" y="43" width="10" height="10" rx="2.5" fill="#ced4da" stroke="#adb5bd" stroke-width="1"/><path d="M80 45.5 v5 M82.6 45.5 v5 M85.2 45.5 v5" stroke="#adb5bd" stroke-width=".9"/>`},

 {id:'cat_cape',name:'고양이 망토',price:1100,rarity:1,added:'2026-11-09',desc:'뾰족 귀 후드 망토와 방울 목걸이. 냥!',
  body:'#fff8e7',belt:'#fff8e7',
  back:`<circle cx="50" cy="38" r="30.5" fill="#8d99ae"/><path d="M34 60 Q50 55 66 60 L75 91 Q50 96 25 91Z" fill="#8d99ae"/>`,
  over:`<rect x="32.5" y="59" width="35" height="26" rx="12" fill="none" stroke="#e8dcc0" stroke-width="1"/><path d="M37 62 Q50 69 63 62" stroke="#e63946" stroke-width="2.8" fill="none" stroke-linecap="round"/><circle cx="50" cy="68.5" r="3" fill="#ffd34d" stroke="#e0a800" stroke-width=".8"/><path d="M48.5 69 h3" stroke="#a07800" stroke-width=".8"/>`,
  hat:`<path d="M24 34 C26 18 37 10 50 10 C63 10 74 18 76 34 C70 22 60 17 50 17 C40 17 30 22 24 34Z" fill="#9aa5b8"/><path d="M26 22 L28 3 L42 13Z" fill="#8d99ae" stroke="#76839b" stroke-width="1.2" stroke-linejoin="round"/><path d="M29 17 L30 8 L37.5 13Z" fill="#ffc8dd"/><path d="M74 22 L72 3 L58 13Z" fill="#8d99ae" stroke="#76839b" stroke-width="1.2" stroke-linejoin="round"/><path d="M71 17 L70 8 L62.5 13Z" fill="#ffc8dd"/>`,
  face:`<path d="M31 50 l-7 -1.5 M31 52.5 l-7 1.5 M69 50 l7 -1.5 M69 52.5 l7 1.5" stroke="#8d6e63" stroke-width="1" stroke-linecap="round"/>`,
  side:`<circle cx="83" cy="76" r="6" fill="#ff8fab"/><path d="M78 73 q5 4 10 0 M78 78.5 q5 -4 10 0 M80.5 71 q3 5 0 10" stroke="#e56b8a" stroke-width="1" fill="none"/>`},

 {id:'y2k_street',name:'Y2K 스트릿',price:1200,rarity:1,added:'2026-11-09',desc:'하트 크롭티, 체인 벨트, 핑크 틴트 안경',trend:'Y2K 리바이벌',
  body:'#c77dff',belt:'#c77dff',legs:'#5c8dd6',
  over:`<path d="M32.5 77 H67.5 V78 C67.5 82 64 85 60 85 H40 C36 85 32.5 82 32.5 78Z" fill="#5c8dd6"/><path d="M33 77 H67" stroke="#e3e3e3" stroke-width="1.8" stroke-dasharray="2 1.2"/><path d="M50 75 C44 70.5 44 67 47 67 C48.6 67 49.5 68.1 50 69 C50.5 68.1 51.4 67 53 67 C56 67 56 70.5 50 75Z" fill="#ff4fa3" stroke="#fff" stroke-width="1"/>`,
  face:`<g fill="#ff9fd2" fill-opacity=".45" stroke="#ff4fa3" stroke-width="1.3"><ellipse cx="41" cy="44.5" rx="6.8" ry="5.2"/><ellipse cx="59" cy="44.5" rx="6.8" ry="5.2"/></g><path d="M47.8 44 h4.4" stroke="#ff4fa3" stroke-width="1.3"/>`,
  hat:`<g transform="translate(32 23) rotate(-20)"><path d="M0 0 C-5 -5 -7 1 -3 2 C-7 4 -3 8 0 3Z" fill="#7df9c3"/><path d="M0 0 C5 -5 7 1 3 2 C7 4 3 8 0 3Z" fill="#7df9c3"/></g><g transform="translate(66 21) rotate(18)"><path d="M0 0 C-5 -5 -7 1 -3 2 C-7 4 -3 8 0 3Z" fill="#ffe066"/><path d="M0 0 C5 -5 7 1 3 2 C7 4 3 8 0 3Z" fill="#ffe066"/></g>`},

 {id:'hero_cape',name:'히어로 망토',price:1400,rarity:1,added:'2026-11-09',desc:'유혹으로부터 나를 지키는 정의의 히어로',
  body:'#2f5fd0',belt:'#1d3e8a',legs:'#2f5fd0',
  back:`<path d="M36 60 Q50 56 64 60 L74 90 Q50 95 26 90Z" fill="#e63946" stroke="#b5252f" stroke-width="1.2"/>`,
  shoes:`<path d="M37 85 h11 v7.5 q0 1.5 -1.5 1.5 h-9.5 q-1.5 0 -1.5 -1.5z" fill="#ffcc00" stroke="#e0a800" stroke-width=".8"/><path d="M52 85 h11 v7.5 q0 1.5 -1.5 1.5 h-9.5 q-1.5 0 -1.5 -1.5z" fill="#ffcc00" stroke="#e0a800" stroke-width=".8"/>`,
  over:`<path d="M50 65.5 l2 4 4.4.6-3.2 3.1.8 4.4-4-2.1-4 2.1.8-4.4-3.2-3.1 4.4-.6z" fill="#ffcc00" stroke="#e0a800" stroke-width=".8"/>`,
  mask:`<path d="M29 43 C33 37 44 37 50 41 C56 37 67 37 71 43 C70 48 64 50 58 49 C54 48.5 52 46 50 46 C48 46 46 48.5 42 49 C36 50 30 48 29 43Z" fill="#1d3557"/><ellipse cx="41" cy="44.5" rx="5" ry="5.8" fill="#fff"/><ellipse cx="59" cy="44.5" rx="5" ry="5.8" fill="#fff"/>`},

 {id:'gorpcore',name:'고프코어 아웃도어',price:1500,rarity:1,added:'2026-11-09',desc:'바람막이, 버킷햇, 트레일 러닝화로 산 타러 가요',trend:'고프코어',
  body:'#2d6a4f',belt:'#2d6a4f',legs:'#6c757d',
  back:`<rect x="28" y="58" width="44" height="24" rx="10" fill="#e9c46a" stroke="#c9a33a" stroke-width="1.2"/>`,
  shoes:`<path d="M36 87 h13 v4 q0 2.5 -2.5 2.5 h-9 q-1.5 0 -1.5 -2.5z" fill="#e76f51"/><path d="M51 87 h13 v4 q0 2.5 -2.5 2.5 h-9 q-1.5 0 -1.5 -2.5z" fill="#e76f51"/><path d="M36 91.5 h13 M51 91.5 h13" stroke="#3d405b" stroke-width="1.4"/>`,
  over:`<path d="M33 67 Q50 61 67 67 L67.5 71 Q50 65 32.5 71Z" fill="#f4a261"/><path d="M50 64 V85" stroke="#1b4332" stroke-width="1.4"/><rect x="51.5" y="68" width="1.6" height="4" fill="#d8f3dc"/><rect x="38" y="75" width="8" height="6" rx="1.5" fill="none" stroke="#1b4332" stroke-width="1.1"/><path d="M38 77 h8" stroke="#1b4332" stroke-width="1.1"/>`,
  hat:`<path d="M29.5 29 C29.5 15 70.5 15 70.5 29Z" fill="#c9b78f"/><path d="M21 31 Q50 23 79 31 L76 36 Q50 29 24 36Z" fill="#b5a27a"/><rect x="29" y="26" width="42" height="3" fill="#8a7a55"/>`,
  side:`<path d="M83 50 L80 92" stroke="#495057" stroke-width="2.4" stroke-linecap="round"/><rect x="80.5" y="49" width="5" height="9" rx="2" fill="#e76f51" transform="rotate(4 83 53)"/>`},

 {id:'hanbok_blossom',name:'벚꽃 한복',price:2200,rarity:2,added:'2026-11-09',desc:'분홍 치마에 고름, 벚꽃 머리핀이 살랑',
  body:'#fff3f6',belt:'#fff3f6',legs:'#ff8fab',
  back:`<g fill="#ffc2d1" opacity=".9"><ellipse cx="12" cy="30" rx="3" ry="2" transform="rotate(30 12 30)"/><ellipse cx="89" cy="52" rx="3" ry="2" transform="rotate(-20 89 52)"/><ellipse cx="14" cy="76" rx="2.6" ry="1.8"/><ellipse cx="86" cy="20" rx="2.4" ry="1.6" transform="rotate(40 86 20)"/></g>`,
  over:`<path d="M33 71 H67 L72 89 Q50 94 28 89Z" fill="#ff8fab"/><path d="M33 71 H67 L68 74 H32Z" fill="#ff6f96"/><path d="M41 60 L50 68 L59 60" stroke="#fff" stroke-width="3" fill="none"/><path d="M50 68 q-5 4 -7 11 M50 68 q2 5 1 12" stroke="#d6336c" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="50" cy="68" r="2.6" fill="#d6336c"/><g fill="#fff" opacity=".85"><circle cx="38" cy="83" r="1.6"/><circle cx="60" cy="86" r="1.6"/><circle cx="65" cy="79" r="1.3"/></g>`,
  hat:`<g transform="translate(70 26)" fill="#ffc2d1" stroke="#ff8fab" stroke-width=".6"><circle cx="0" cy="-4" r="3.6"/><circle cx="3.8" cy="-1.2" r="3.6"/><circle cx="2.4" cy="3.2" r="3.6"/><circle cx="-2.4" cy="3.2" r="3.6"/><circle cx="-3.8" cy="-1.2" r="3.6"/><circle r="2" fill="#ffd34d" stroke="none"/></g><g transform="translate(62 17) scale(.6)" fill="#ffd6e0"><circle cx="0" cy="-4" r="3.6"/><circle cx="3.8" cy="-1.2" r="3.6"/><circle cx="2.4" cy="3.2" r="3.6"/><circle cx="-2.4" cy="3.2" r="3.6"/><circle cx="-3.8" cy="-1.2" r="3.6"/><circle r="2" fill="#ffd34d"/></g>`},

 {id:'star_wizard',name:'별빛 마법사',price:2600,rarity:2,added:'2026-11-09',desc:'밤하늘 로브와 달 모자, 별 지팡이를 든 마법사',
  body:'#3b2f8f',belt:'#ffd34d',legs:'#2a2170',
  back:`<path d="M34 60 Q50 56 66 60 L75 92 Q50 97 25 92Z" fill="#241a63"/><g fill="#ffe680"><path d="M12 30 l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z"/><path d="M90 64 l1.2 2.6 2.6 1.2-2.6 1.2-1.2 2.6-1.2-2.6-2.6-1.2 2.6-1.2z"/><circle cx="16" cy="58" r="1.2"/><circle cx="88" cy="34" r="1.2"/></g>`,
  over:`<g fill="#ffe680"><circle cx="39" cy="68" r="1.2"/><circle cx="60" cy="80" r="1.2"/><circle cx="57" cy="68" r=".9"/><circle cx="42" cy="81" r=".9"/></g><path d="M41 61 L50 68 L59 61" stroke="#ffd34d" stroke-width="1.6" fill="none"/>`,
  hat:`<path d="M50 -9 C55 0 68 16 78 30 L22 30 C32 16 45 0 50 -9Z" fill="#2a1f6b"/><ellipse cx="50" cy="30" rx="32" ry="6.2" fill="#1e1650"/><rect x="30" y="23.5" width="40" height="4" fill="#ffd34d"/><path d="M58 8 a6.5 6.5 0 1 0 5 10.5 a5 5 0 1 1 -5 -10.5z" fill="#ffe680"/><path d="M41 15 l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z" fill="#ffe680"/>`,
  side:`<circle cx="82" cy="49" r="9" fill="#ffe680" opacity=".25"/><rect x="80.6" y="56" width="2.8" height="24" rx="1.4" fill="#c8a2ff"/><path d="M82 41 l2.3 4.7 5.2.8-3.8 3.6.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.6 5.2-.8z" fill="#ffe066" stroke="#f0b400" stroke-width="1"/>`},

 {id:'idol_stage',name:'아이돌 무대의상',price:3000,rarity:2,added:'2026-11-09',desc:'반짝이 재킷, 핑크 머리, 헤드셋 마이크. 무대 위 주인공',
  body:'#7b4fc9',belt:'#ffd34d',legs:'#1f1b3a',hair:'#ff8fc8',
  back:`<path d="M50 -10 L18 95 H82Z" fill="#fff3b0" opacity=".35"/><g fill="#fff"><path d="M14 40 l1.2 2.6 2.6 1.2-2.6 1.2-1.2 2.6-1.2-2.6-2.6-1.2 2.6-1.2z"/><path d="M88 26 l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1z"/></g>`,
  over:`<path d="M42 60 L50 77 L58 60Z" fill="#1f1b3a"/><path d="M42 60 L50 77 L58 60" stroke="#ffd34d" stroke-width="1.5" fill="none" stroke-linejoin="round"/><g fill="#fff"><circle cx="37" cy="66" r="1"/><circle cx="63" cy="67" r="1"/><circle cx="39" cy="80" r="1"/><circle cx="61" cy="81" r="1"/></g><g fill="#ffd34d"><circle cx="41" cy="71" r=".9"/><circle cx="59" cy="72" r=".9"/><circle cx="45" cy="81" r=".9"/><circle cx="55" cy="80" r=".9"/></g>`,
  face:`<path d="M25 42 Q24 53 36 55.5" stroke="#3a3a3a" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="37.5" cy="55.5" rx="2.6" ry="1.8" fill="#3a3a3a"/>`,
  hat:`<path d="M24.5 38 Q24 14 50 13" stroke="#3a3a3a" stroke-width="2" fill="none"/><rect x="21" y="36" width="6" height="10" rx="3" fill="#3a3a3a"/><path d="M66 18 l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#ffd34d"/>`,
  side:`<rect x="81" y="58" width="3" height="19" rx="1.5" fill="#f1f1f1" stroke="#ccc" stroke-width=".6"/><path d="M82.5 60 C76 54 76 46 80 46 C81.5 46 82.5 47.5 82.5 48.5 C82.5 47.5 83.5 46 85 46 C89 46 89 54 82.5 60Z" fill="#ffb3e6" stroke="#ff5cc8" stroke-width="1.3"/>`}
];
