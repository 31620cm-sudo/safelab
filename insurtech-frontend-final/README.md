# AI 약관 도우미 - 지능형 화상 상담소

## 팀명: 인슈어테크 | 이예진, 지윤석

## 실행 방법

```bash
npm install
npm start
```

브라우저에서 http://localhost:3000 접속

## Gemini API 연동

1. https://aistudio.google.com 에서 API 키 발급 (무료)
2. `src/pages/ConsultationRoomPage.js` 파일 열기
3. 상단의 `YOUR_GEMINI_API_KEY` 를 실제 키로 교체

## 화면 구성

- `/login` - 로그인
- `/register` - 회원가입  
- `/main` - 메인 홈 (상담 이력)
- `/device-check` - 장치 체크
- `/room/:roomId` - AI 화상 상담실
- `/summary/:roomId` - 상담 종료 요약
- `/landing` - 안전관리/안전교육 서비스 소개 랜딩페이지 (경진대회 데모용)

## 기술 스택

- React 18
- React Router v6
- Google Gemini 1.5 Flash API
- WebRTC (카메라/마이크)
- Tailwind CSS (랜딩페이지 한정 격리 스코프)
- lucide-react · framer-motion

## Safety Landing Page (`/landing`)

경진대회 출품용 1페이지 랜딩페이지. **푸드/스플래시 모티프 미사용**, 모던하고 신뢰감 있는 톤.

### 어디를 수정하나

| 변경하고 싶은 것 | 파일 |
|---|---|
| 카피·메뉴·태그·라인업·연락처 (모든 텍스트 단일 소스) | `src/data/landing.js` |
| 컬러 토큰 (`--brand-primary` 등 CSS 변수) | `src/index.css` 의 `:root` |
| 폰트 (Manrope · Inter · Pretendard) | `public/index.html` 의 `<link>` + `tailwind.config.js` 의 `fontFamily` |
| 메인 비주얼 placeholder | `src/components/landing/Hero.jsx` 의 `// TODO` 주석 위치 (`public/landing/hero.png` 권장) |
| 도입 문의 폼 API 연결 | `src/components/landing/ContactForm.jsx` 의 `// TODO: API 연결` 위치 (`POST /api/inquiries`) |
| 라우트 (현재 `/landing`) | `src/App.js` |

### 구조

```
src/pages/SafetyLandingPage.jsx     ← 페이지 셸 (Header/Hero/About/Lineup/ContactForm/Footer 조립)
src/components/landing/             ← 6개 섹션 컴포넌트 + Toast
src/data/landing.js                 ← 모든 카피/데이터
src/hooks/useToast.js               ← 자체 Toast (Context 기반) + useScrollFadeUp 백업
src/index.css                       ← Tailwind directives + CSS 변수
tailwind.config.js                  ← 격리 스코프 설정
postcss.config.js
```

### Tailwind 격리 메커니즘 (중요)

기존 12페이지의 글로벌 CSS를 보존하기 위해 **3중 가드** 적용:

1. **content scope** — `tailwind.config.js` 의 `content` 가 `src/pages/SafetyLandingPage.jsx` 와 `src/components/landing/**` 만 스캔
2. **`important: '.landing-root'`** — 모든 Tailwind 유틸이 `.landing-root .xxx` 로 격상 → 다른 페이지에 새지 않음
3. **`corePlugins.preflight: false`** — 글로벌 reset 비활성화 → 기존 `src/styles/global.css` 와 충돌 없음

다른 페이지에서도 Tailwind를 쓰고 싶다면 위 3가지를 조정해야 합니다.

### 임시 스텁 파일

`src/pages/DashboardPage.js` 는 `App.js` 가 import 하지만 실제 파일이 누락돼 있던 상태라 빌드 통과를 위해 placeholder 로 추가했습니다. 추후 실제 대시보드로 교체하세요.
