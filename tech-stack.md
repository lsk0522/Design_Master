# Tech Stack Decision Document

> **Essence Design System** 기술 스택 결정문 및 트레이드오프 분석

---

## 📋 결정 요약

| Layer | Choice | Version | Status |
|-------|--------|---------|--------|
| **Package Manager** | pnpm | 9.x | ✅ 확정 |
| **Monorepo Tool** | Turborepo | 1.13+ | ✅ 확정 |
| **Language** | TypeScript | 5.4+ (strict) | ✅ 확정 |
| **Build Tool** | tsup | 8.x | ✅ 확정 |
| **Styling** | Vanilla Extract | 1.14+ | ✅ 확정 |
| **Component Primitives** | Radix UI | 1.0+ | ✅ 확정 |
| **Motion** | Motion One | 10.17+ | ✅ 확정 |
| **Testing** | Vitest + Testing Library + Playwright | 최신 | ✅ 확정 |
| **Storybook** | Storybook 8 (Vite) | 8.x | ✅ 확정 |
| **Documentation** | VitePress | 1.x | ✅ 확정 |
| **Tokens** | Theo | 16.x | ✅ 확정 |
| **Lint/Format** | Biome | 1.6+ | ✅ 확정 |
| **CI/CD** | GitHub Actions | - | ✅ 확정 |
| **Release** | Changesets | 2.27+ | ✅ 확정 |

---

## 🔍 상세 분석 및 트레이드오프

### 1. Package Manager: pnpm

| 기준 | pnpm | npm | yarn |
|------|------|-----|------|
| **모노레포 지원** | ✅ 네이티브 (workspaces) | ✅ workspaces | ✅ workspaces |
| **디스크 효율** | ✅ 하드링크/글로벌 스토어 | ❌ 중복 설치 | △ 플러그인 필요 |
| **설치 속도** | ✅ 가장 빠름 | 보통 | 빠름 |
| **엄격한 의존성** | ✅ 호이스팅 방지 | ❌ 유령 의존성 가능 | △ PnP로 해결 가능 |
| **생태계 호환** | ✅ npm 레지스트리 완전 호환 | 기본 | 호환 |

**결정 이유**: 모노레포에서 디스크 효율과 설치 속도, 엄격한 의존성 관리가 핵심. Turborepo와 네이티브 통합.

---

### 2. Monorepo Tool: Turborepo

| 기준 | Turborepo | Nx | Lerna |
|------|-----------|-----|-------|
| **설정 복잡도** | ✅ 최소 (turbo.json) | 높음 | 중간 |
| **캐싱** | ✅ 원격 캐싱 무료 | 유료/셀프호스팅 | 없음 |
| **병렬 실행** | ✅ 지능적 스케줄링 | ✅ | 수동 |
| **태스크 파이프라인** | ✅ 선언적 | 선언적 | 스크립트 기반 |
| **IDE 통합** | ✅ VS Code 확장 | ✅ 강력함 | 기본 |
| **학습 곡선** | ✅ 낮음 | 높음 | 중간 |

**결정 이유**: 설정 간소성, 무료 원격 캐싱(Vercel), pnpm 네이티브 지원. 소규모 팀에 최적.

---

### 3. Styling: Vanilla Extract

| 기준 | Vanilla Extract | StyleX | Panda CSS | Tailwind + CSS Variables | Styled Components | Emotion |
|------|-----------------|--------|-----------|--------------------------|-------------------|---------|
| **제로 런타임** | ✅ | ✅ | ✅ | ✅ (JIT) | ❌ | ❌ |
| **타입 안전 토큰** | ✅ 최고 | ✅ 높음 | ✅ 높음 | △ 설정 필요 | ❌ | ❌ |
| **CSS Variables 네이티브** | ✅ | △ | ✅ | ✅ | ❌ | ❌ |
| **테마 지원** | ✅ 우수 | ✅ 우수 | ✅ 우수 | ✅ 네이티브 | △ | △ |
| **번들 크기** | 최소 | 최소 | 최소 | 런타임 없음 | +12KB | +8KB |
| **학습 곡선** | 중간 | 높음 | 낮음 | 낮음 | 낮음 | 낮음 |
| **React 생태계** | ✅ 공식 지원 | Meta 내부 | ✅ | ✅ | ✅ | ✅ |
| **토큰 직결** | ✅ `var(--token)` | ✅ | ✅ | 수동 매핑 | 어려움 | 어려움 |

**결정 이유**: 
- **타입 안전 토큰 직결**이 핵심 요구사항 → Vanilla Extract, StyleX만 만족
- **CSS Variables 네이티브** 지원으로 테마 전환/다크모드/하이컨트라스트 구현 용이
- **제로 런타임**으로 성능 보장
- StyleX는 Meta 내부 도구 성향 강함, 문서화/커뮤니티 상대적 약함

**우려사항**: 
- 학습 곡선 존재 (Recipe/Variants 패턴)
- 디버깅 시 컴파일된 CSS 클래스명 난독화
- → Source maps + Storybook으로 완화

---

### 4. Component Primitives: Radix UI

| 기준 | Radix UI | Headless UI | AriaKit | 직접 구현 |
|------|----------|-------------|---------|-----------|
| **접근성 완성도** | ✅ 최고 (WAI-ARIA 패턴 완전 구현) | ✅ 높음 | ✅ 높음 | 직접 구현 필요 |
| **컴포넌트 수** | ✅ 40+ | 15+ | 20+ | 무한 |
| **타입스크립트** | ✅ 일급 지원 | ✅ | ✅ | 직접 정의 |
| **스타일 비침투** | ✅ 완전 헤드리스 | ✅ | ✅ | 직접 제어 |
| **번들 크기** | 트리쉐이킹 지원 | 트리쉐이킹 | 트리쉐이킹 | 최소 |
| **유지보수** | ✅ 활발 (Vercel) | Tailwind 팀 | 개인/소규모 | 직접 부담 |
| **생태계** | 최대 | 성장 중 | 성장 중 | 없음 |

**결정 이유**: 
- 접근성 완성도 최고 (포커스 관리, 키보드 내비게이션, ARIA 패턴 검증 완료)
- 가장 성숙한 생태계, 풍부한 레퍼런스
- Vanilla Extract와 조합 시 스타일 완전 분리 가능

**래핑 전략**: 
- Radix Primitives를 직접 노출하지 않고 **Essence 컴포넌트로 래핑**
- Vanilla Extract 스타일 + 토큰 바인딩 + 공통 Props 인터페이스 제공
- 향후 교체 가능하도록 내부 구현 캡슐화

---

### 5. Motion: Motion One (WAAPI 기반)

| 기준 | Motion One | Framer Motion | CSS Transitions | Anime.js |
|------|------------|---------------|-----------------|----------|
| **번들 크기** | ✅ ~4KB | ~50KB | 0KB | ~17KB |
| **WAAPI 네이티브** | ✅ | ❌ (자체 엔진) | 네이티브 | ❌ |
| **스프링 물리학** | ✅ | ✅ | 제한적 | ✅ |
| **리듀스드 모션** | ✅ 네이티브 | 수동 처리 | 미디어 쿼리 | 수동 |
| **레이아웃 애니메이션** | ✅ (FLIP) | ✅ (layoutId) | ❌ | ❌ |
| **React 바인딩** | ✅ @motionone/react | ✅ 네이티브 | 수동 | 래퍼 필요 |

**결정 이유**: 
- **WAAPI 기반**으로 메인 스레드 차단 최소화, 배터리 효율
- **리듀스드 모션 네이티브 지원** (접근성 필수)
- **초경량** 번들 크기
- 스프링 프리셋으로 Material 3 Expressive 모션 구현 가능

---

### 6. Testing Stack

| 도구 | 용도 | 선택 이유 |
|------|------|-----------|
| **Vitest** | 단위/통합 테스트 | Vite 네이티브, 초고속, Jest 호환 API |
| **Testing Library** | 컴포넌트 테스트 | 사용자 중심 테스트 철학, 접근성 내장 |
| **Playwright** | E2E/비주얼 리그레션 | 크로스브라우저, 빠른 병렬 실행, 스크린샷 비교 |
| **axe-core** | 접근성 자동화 | 업계 표준, CI 통합 용이 |
| **Storybook** | 시각적 문서화/테스트 | 컴포넌트 탐색, 인터랙션 테스트, Chromatic 연동 |

---

### 7. Documentation: VitePress

| 기준 | VitePress | Docusaurus | Nextra | GitBook |
|------|-----------|------------|--------|---------|
| **빌드 속도** | ✅ Vite 기반 초고속 | 느림 (Webpack) | 빠름 | 클라우드 |
| **Vue 생태계** | Vue 3 + Vite | React | Next.js | 독자적 |
| **풀텍스트 검색** | ✅ 내장 (Algolia) | ✅ Algolia | ✅ | ✅ |
| **다국어** | ✅ 내장 | ✅ 플러그인 | ✅ | ✅ |
| **컴포넌트 임베드** | ✅ Vue 컴포넌트 | MDX | MDX | 제한적 |
| **테마 커스터마이징** | ✅ 완전 제어 | 테마 시스템 | 테마 | 제한적 |

**결정 이유**: Vite 생태계 일관성, 초고속 빌드, Vue 3로 인터랙티브 데모/플레이그라운드 구현 용이.

---

### 8. Tokens: Theo

| 기준 | Theo | Style Dictionary | Tokens Studio | 직접 구현 |
|------|------|------------------|---------------|-----------|
| **출력 포맷** | ✅ 10+ (CSS, JS, TS, SCSS, JSON, Figma, Android, iOS) | ✅ 15+ | Figma 중심 | 직접 구현 |
| **변환 파이프라인** | ✅ 함수형, 체이닝 | 설정 기반 | UI 기반 | 직접 구현 |
| **타입스크립트** | ✅ 생성 지원 | ✅ | 제한적 | 직접 구현 |
| **테마 지원** | ✅ 다중 테마 세트 | ✅ | ✅ | 직접 구현 |
| **유지보수** | Amazon (활발) | Adobe (활발) | 상용 | 직접 부담 |

**결정 이유**: Amazon 유지보수, 함수형 API로 커스텀 변환 로직 작성 용이, TypeScript 타입 자동 생성 지원.

---

### 9. Lint/Format: Biome

| 기준 | Biome | ESLint + Prettier |
|------|-------|-------------------|
| **속도** | ✅ 10-30x 빠름 (Rust) | 느림 (JS) |
| **통합** | ✅ Lint + Format 단일 도구 | 두 도구 설정 필요 |
| **규칙 호환** | ESLint/Prettier 대부분 커버 | 표준 |
| **타입스크립트** | ✅ 내장 지원 | 플러그인 필요 |
| **IDE 통합** | ✅ VS Code 확장 | ✅ 성숙 |
| **설정 마이그레이션** | 자동 마이그레이션 도구 제공 | - |

**결정 이유**: 속도와 통합 설정의 이점. 규칙 대다수 ESLint/Prettier 호환으로 마이그레이션 비용 낮음.

---

### 10. Release: Changesets

| 기준 | Changesets | Standard Version | Semantic Release | 수동 |
|------|------------|------------------|------------------|------|
| **모노레포 지원** | ✅ 네이티브 | △ 설정 필요 | ✅ | 직접 |
| **체인지로그 자동 생성** | ✅ | ✅ | ✅ | 직접 |
| **버전 범핑** | ✅ 독립/고정 모드 | 패키지별 | 통합 | 직접 |
| **PR 기반 워크플로우** | ✅ | 커밋 기반 | 커밋 기반 | 직접 |
| **npm 퍼블리시** | ✅ 통합 | 별도 스크립트 | ✅ | 직접 |

**결정 이유**: 모노레포 네이티브 지원, PR 기반 워크플로우(리뷰 과정에서 변경사항 기록), 독립 버저닝 지원.

---

## 🔄 마이그레이션/교체 전략

### 스타일링 교체 시나리오 (Vanilla Extract → Panda CSS)
1. 토큰은 **Theo 출력**으로 공유 (CSS Variables, JS/TS 객체)
2. 컴포넌트 내부 스타일만 교체, Props 인터페이스 유지
3. `@vanilla-extract/recipes` → `@panda/css` 레시피 변환
4. Storybook 시각적 회귀 테스트로 검증

### 프리미티브 교체 시나리오 (Radix UI → Headless UI)
1. 래퍼 컴포넌트(`Button`, `Dialog` 등) 내부 구현만 교체
2. 공개 API(`ButtonProps`, `DialogProps`) 변경 최소화
3. 접근성 테스트(axe-core)로 회귀 검증

### 번들러 교체 시나리오 (tsup → Rolldown/Rspack)
1. `tsup.config.ts`만 교체, 엔트리/아웃풋 설정 유지
2. `package.json` exports 필드 유지
3. 타입 생성(`dts: true`) 호환성 확인

---

## 📦 패키지별 의존성 그래프

```
@essence/tokens (독립)
    ↓
@essence/core (peer: react)
    ↓
@essence/react (peer: react, react-dom, @essence/tokens, @essence/core)
@essence/vue (peer: vue, @essence/tokens, @essence/core)
@essence/docs (peer: @essence/react, @essence/tokens)
@essence/tools (dev only)
```

**순환 의존성 없음 보장**: 토큰 → 코어 → 프레임워크별 래퍼 단방향

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 | 결정자 |
|------|------|-----------|--------|
| 2026-09-13 | 0.1.0 | 초기 기술 스택 결정 (통합형 설계안 기반) | - |