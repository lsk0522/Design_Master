# plan.md — 6단계 8주 실행 계획

> **목표**: Design System "Essence" v1.0.0 릴리즈
> **기간**: 8주 (주 20-30h 기준, 파트타임 병행 가능)
> **팀**: 1인 풀스택 (디자인+엔지니어링) 또는 2인 (디자이너 1 + 엔지니어 1)

---

## 📅 Timeline Overview

| Week | Phase | Focus |
|------|-------|-------|
| 1-2 | **Phase 0** | Foundation: 원칙 확정, 스택 결정, 레포 설정, CI/CD |
| 2-3 | **Phase 1** | Design Tokens: 시맨틱 토큰, 색상/타이포/스페이스/모션, 테마 시스템 |
| 3-6 | **Phase 2** | Core Components: 60+ 컴포넌트 (Foundations → Primitives → Composites) |
| 5-6 | **Phase 3** | Patterns & Layouts: 네비게이션, 폼, 데이터 표시, 피드백, 앱 쉘 |
| 6-7 | **Phase 4** | Advanced Systems: Theming, Icons, Motion, i18n, Accessibility Kit |
| 7-8 | **Phase 5** | Governance & Docs: 리뷰 체크리스트, 기여 가이드, 문서 사이트, 배포 |
| 8+ | **Phase 6** | Validation & Launch: 도그푸딩, 접근성 감사, 성능 벤치마크, v1.0.0 |

---

## Phase 0: Foundation (Week 1-2)

### 0.1 원칙 확정 워크숍
- [ ] `build.md` 원칙 5개 최종 검토/수정
- [ ] 각 원칙별 **결정 근거(Why)**, **적용 가이드(How)**, **안티패턴(Don't)** 문서화
- [ ] 산출물: `principles.md`

### 0.2 기술 스택 확정
- [ ] `tech-stack.md` 작성: 결정 사항 + 트레이드오프 분석 + 대안 비교표
- [ ] 확정 스택 (기본값, 변경 가능):
  | Layer | Choice | Rationale |
  |-------|--------|-----------|
  | Package Manager | **pnpm** | 모노레포 최적화, 디스크 효율, 속도 |
  | Monorepo Tool | **Turborepo** | 캐싱, 병렬 실행, 단순 설정 |
  | Language | **TypeScript 5+** (strict) | 타입 안전성, 토큰-컴포넌트 타입 직결 |
  | Build | **Vite** (lib mode) + **tsup** | 빠른 HMR, ESM/CJS 동시 출력 |
  | Styling | **Vanilla Extract** | 제로 런타임, 타입 안전 토큰, CSS Variables 네이티브 |
  | Component Primitives | **Radix UI** + 커스텀 래퍼 | 성숙도, 접근성 완비, 헤드리스 패턴 |
  | Motion | **Motion One** (WAAPI 기반) | 경량, 스프링 물리학, 리듀스드 모션 네이티브 |
  | Testing | **Vitest** + **Testing Library** + **Playwright** | 단위/통합/E2E 통합 |
  | Storybook | **Storybook 8** (Vite builder) | 컴포넌트 문서화, 시각적 테스트 |
  | Docs | **VitePress** | 빠른 빌드, Vue 기반, 검색 내장 |
  | Tokens | **Theo** (Design Tokens Transformer) | 다중 포맷 출력, 플랫폼 독립 |
  | Lint/Format | **Biome** (ESLint+Prettier 대체) | 초고속, 통합 설정 |
  | CI/CD | **GitHub Actions** | 무료, 생태계 풍부 |
  | Release | **Changesets** | 버전링, 체인지로그, npm 퍼블리시 자동화 |

### 0.3 레포지토리 구조 생성
```bash
# 초기 구조 생성
pnpm init -w
mkdir -p packages/{tokens,core,react,vue,docs,tools}
mkdir -p .github/workflows
```

- [ ] `pnpm-workspace.yaml` 작성
- [ ] 루트 `package.json` (workspaces, scripts, engines)
- [ ] `tsconfig.base.json` (strict, path aliases)
- [ ] `.github/workflows/ci.yml` (lint, typecheck, test, build)
- [ ] `.github/workflows/release.yml` (changesets → npm publish)
- [ ] `.gitignore`, `.npmrc`, `.editorconfig`

### 0.4 CI/CD 파이프라인
- [ ] Biome lint/format
- [ ] TypeScript typecheck (모든 패키지)
- [ ] Vitest unit/integration tests
- [ ] Playwright E2E (주요 플로우)
- [ ] Storybook build (Chromatic 연동 준비)
- [ ] VitePress build
- [ ] Bundle size check (size-limit)
- [ ] Changesets version/publish

---

## Phase 1: Design Tokens (Week 2-3)

### 1.1 토큰 인프라 구축
- [ ] `packages/tokens` 초기화: `package.json`, `tsconfig.json`, `theo.config.js`
- [ ] Theo 변환 파이프라인: JSON → CSS Variables, SCSS, JS/TS, Figma Tokens, Android XML, iOS JSON
- [ ] `build:tokens` 스크립트: `pnpm --filter tokens build`

### 1.2 Primitive Tokens (원시값)
| Category | Tokens | Count | Source |
|----------|--------|-------|--------|
| Color | `raw-{hue}-{step}` (hue: 12, step: 50-950) | ~120 | Material 3 팔레트 확장 |
| Spacing | `raw-{step}` (0-24, 4px base) | 25 | 4px 그리드 + 플루이드 확장 |
| Typography | `raw-{family}-{weight}-{size}-{lineHeight}` | ~40 | Inter + 변수 폰트 |
| Border | `raw-{width}-{style}-{radius}` | ~20 | 1px, 2px / none,solid,dashed / 4-radius |
| Motion | `raw-{easing}-{duration}` | ~15 | Material 3 Expressive 스프링 |
| Elevation | `raw-{level}` (0-24) | 25 | Fluent 2 톤 오버레이 |
| Z-index | `raw-{layer}` | 10 | 레이어 체계화 |
| Breakpoints | `raw-{name}` | 6 | 컨테이너 쿼리 대응 |

### 1.3 Semantic Tokens (의미론적)
| Category | Structure | Example |
|----------|-----------|---------|
| Color | `color/{role}/{variant}/{state?}` | `color/primary/brand`, `color/surface/elevated/hover` |
| Spacing | `spacing/{context}/{scale?}` | `spacing/inline/sm`, `spacing/section/lg` |
| Typography | `typography/{role}/{variant?}` | `typography/display/lg`, `typography/body/md` |
| Border | `border/{role}/{variant}` | `border/input/default`, `border/card/hover` |
| Motion | `motion/{intent}/{variant?}` | `motion/enter/fast`, `motion/transition/medium` |
| Elevation | `elevation/{level}` | `elevation/1`, `elevation/overlay` |

**Roles**: primary, secondary, tertiary, surface, background, border, text, icon, status(success/warning/error/info), focus, selection, overlay

### 1.4 Component Tokens (컴포넌트별)
- 각 컴포넌트별 `component/{name}/{variant}/{state}/{property}` 구조
- 예: `component/button/primary/hover/background`, `component/input/default/focus/border-color`

### 1.5 Theme Tokens (테마별 오버라이드)
- [ ] `light`, `dark`, `high-contrast`, `brand` 4개 테마
- [ ] CSS Variables 출력: `:root`, `[data-theme="dark"]`, `@media (prefers-contrast: more)`
- [ ] 브랜드 테마: CSS 커스텀 프로퍼티로 `--brand-primary`, `--brand-accent` 주입 가능

### 1.6 검증 기준
- [ ] WCAG AA 대비비 전역 통과 (axe-core 자동화)
- [ ] 색맹 시뮬레이션 통과 (protan/deutan/tritan)
- [ ] 다크/라이트/하이컨트라스트 토큰 값 검증 스냅샷 테스트
- [ ] Theo 빌드 산출물 모든 포맷 무결성 검증

---

## Phase 2: Core Components (Week 3-6)

### 컴포넌트 개발 표준 (모든 컴포넌트 필수)

```typescript
// 표준 구조
packages/react/src/components/Button/
├── Button.tsx           // 메인 컴포넌트 (Radix 래핑)
├── Button.styles.ts     // Vanilla Extract 스타일 (토큰 직결)
├── Button.types.ts      // Props 타입 + Variant 타입
├── Button.variants.ts   // cva/class-variance-authority 변형 정의
├── Button.stories.tsx   // Storybook: 모든 변형/상태/접근성
├── Button.test.tsx      // Vitest: 상호작용/스냅샷/접근성
├── Button.md            // 문서: Props, 예시, Don'ts, 마이그레이션
├── index.ts             // 공개 API export
└── Button.figma.tsx     // Figma 동기화 메타데이터 (선택)
```

### 2.1 Foundations (Week 3)
| Component | Radix Base | Key Features |
|-----------|------------|--------------|
| Box | - | asChild, 토큰 직결 props (p, m, bg, color, radius, shadow) |
| Flex | - | gap, align, justify, direction, wrap, flex props |
| Grid | - | templateColumns, templateRows, gap, area |
| Container | - | maxWidth, responsive padding, center |
| VisuallyHidden | - | a11y 전용, focus-visible 시 표시 옵션 |
| Portal | `@radix-ui/react-portal` | 컨테이너 탈출, 모달/툴팁용 |
| Slot | `@radix-ui/react-slot` | 다형성 컴포넌트 합성 |
| Provider | - | ThemeProvider, LocaleProvider, MotionProvider, FocusProvider |

### 2.2 Primitives (Week 3-5)

#### Input Family
- [ ] **Input** — Text, Password, Email, Number, Search, URL, Tel
- [ ] **Textarea** — 리사이즈, 문자수 카운트, 자동 높이
- [ ] **Select** — 단일/다중, 검색 가능, 그룹핑, 비동기 옵션
- [ ] **Combobox** — 자동완성, 프리필터, 캐시
- [ ] **Checkbox** — indeterminate 지원, 라벨 클릭 토글
- [ ] **Radio** / **RadioGroup** — 키보드 내비게이션 (화살표)
- [ ] **Switch** — 토글 애니메이션, 로딩 상태
- [ ] **Slider** — 단일/범위, 스텝, 마크, 수직/수평

#### Interaction Family
- [ ] **Button** — variant(primary/secondary/tertiary/ghost/destructive), size, loading, icon-only, asChild
- [ ] **IconButton** — 원형, 툴팁 내장
- [ ] **ToggleButton** / **ToggleGroup** — 단일/다중 선택, 프레스드 상태
- [ ] **Tooltip** — 지연, 위치 자동 반전, 풍부한 콘텐츠
- [ ] **Popover** — 트리거 클릭/호버, 포커스 트랩, 중첩 지원
- [ ] **Dialog** / **AlertDialog** — 모달/비모달, ESC 닫기, 포커스 복원
- [ ] **Menu** / **DropdownMenu** / **ContextMenu** — 키보드 완비, 체크/라디오 아이템
- [ ] **Tabs** — 자동/수동 활성화, 키보드, 인디케이터 애니메이션
- [ ] **Accordion** / **Collapsible** — 단일/다중 열기, 애니메이션

#### Feedback Family
- [ ] **Toast** — 스택, 액션 버튼, 자동 닫기, 지속/일시
- [ ] **Alert** — variant, 닫기 가능, 링크 포함
- [ ] **Progress** — 결정적/비결정적, 라벨, 색상 변형
- [ ] **Skeleton** — 라운드/직사각형, 펄스/웨이브 애니메이션
- [ ] **Spinner** — 크기, 색상, 속도 변형

#### Display Family
- [ ] **Avatar** — 이미지/이니셜/아이콘, 크기, 그룹(겹침), 상태 뱃지
- [ ] **Badge** — 점/숫자/텍스트, 변형, 최대값
- [ ] **Tag** — 제거 가능, 입력 가능, 변형
- [ ] **Divider** — 방향, 굵기, 여백
- [ ] **Icon** — 크기, 색상, 스핀/펄스 애니메이션

### 2.3 Composites (Week 4-6)

| Component | Composition | Complexity |
|-----------|-------------|------------|
| **Card** | Box + Flex + Slot | Low |
| **Table** | Box + Thead/Tbody/Tr/Th/Td + SortableHeader | Medium |
| **DataGrid** | Virtualized List + Column Resizing + Filtering + Sorting + Selection | High |
| **Form** | Field + FieldError + FieldHint + Validation (Zod/Yup) | Medium |
| **Navigation** | Flex + Link + ActiveIndicator + Responsive (Hamburger) | Medium |
| **Breadcrumb** | Flex + Separator + Collapsed (ellipsis) | Low |
| **Pagination** | Button Group + Ellipsis + Page Size Select | Low |
| **Stepper** | Flex + Step + Connector + Icon/Number | Medium |
| **Sidebar** | Sheet + Nav + Collapsible + Responsive | Medium |
| **Header** | Flex + Logo + Nav + Actions + UserMenu | Medium |
| **Footer** | Grid + Link Groups + Legal | Low |
| **AppShell** | Grid + Header/Sidebar/Content/Footer + Responsive Breakpoints | High |
| **Modal** | Dialog + FocusTrap + Portal + Stack Management | Medium |
| **Drawer** | Sheet + Slide Animation + Swipe Gesture (mobile) | Medium |
| **Sheet** | Dialog 변형 + 하단 고정 + 크기 조절 | Medium |
| **List** / **ListItem** / **ListSection** | Box + Slot + Divider + Interactive | Low |
| **Tree** / **TreeItem** | Recursive + Keyboard (Arrow keys) + Expand/Collapse | High |
| **Calendar** / **DatePicker** / **DateRangePicker** | Popover + Calendar Grid + Keyboard Nav | High |
| **CommandPalette** | Dialog + Search + List + Keyboard Shortcuts | High |
| **Search** | Combobox + Debounce + Highlight + Recent/Trending | Medium |
| **Carousel** | Embla Carousel 래핑 + Autoplay + Thumbnails | Medium |
| **Image** — 지연 로딩, 블러 플레이스홀더, 에러 폴백, 반응형 srcset | Low |
| **Video** — 컨트롤, PIP, 썸네일, 챕터 | Medium |
| **EmptyState** — 일러스트 + 타이틀 + 설명 + 액션 | Low |
| **ErrorBoundary** — 리셋, 폴백 UI, 에러 리포팅 | Low |
| **LoadingState** — Skeleton + Spinner + 진행 메시지 | Low |

### 2.4 각 컴포넌트 완료 정의 (Definition of Done)
- [ ] TypeScript 엄격 모드 통과 (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- [ ] Vanilla Extract 스타일: 토큰만 사용, 하드코딩 값 금지
- [ ] Radix Primitive 접근성 패턴 준수 (ARIA, 키보드, 포커스 관리)
- [ ] Storybook: 모든 variant × size × state 스토리, 접근성 애드온 통과
- [ ] Vitest: 렌더링, 상호작용, 키보드, 스냅샷, 접근성(axe) 테스트
- [ ] 문서: Props 테이블, 사용 예시, 하지 말 것, 마이그레이션 가이드
- [ ] Figma: Variables 연동, Variants 매핑, 컴포넌트 세트 등록
- [ ] 번들 사이즈 영향 측정 (size-limit)

---

## Phase 3: Patterns & Layouts (Week 5-6)

### 3.1 Navigation Patterns
- [ ] **Responsive Nav**: 데스크톱(수평) ↔ 모바일(햄버거+시트) 자동 전환
- [ ] **Command Palette**: `Cmd+K` 열기, 퍼지 검색, 최근/추천, 키보드 완비
- [ ] **Breadcrumbs**: 접힘(ellipsis), 드롭다운 경로 선택
- [ ] **Pagination**: 첫/이전/숫자/다음/마지막, 페이지 크기 선택
- [ ] **Stepper**: 수직/수평, 클릭 가능/읽기 전용, 검증 상태

### 3.2 Form Patterns
- [ ] **Field Layout**: 라벨 + 필수표시 + 힌트 + 에러 + 입력 영역
- [ ] **Validation Patterns**: 실시간/블러/제출 시, 서버 에러 매핑, 토스트 연동
- [ ] **Multi-step Form**: 진행률, 이전/다음, 저장/복원, 검증 게이팅
- [ ] **Wizard**: 사이드바 네비게이션 + 단계별 검증 + 요약 화면
- [ ] **Auto-save**: 디바운스, 충돌 감지, 오프라인 큐

### 3.3 Data Display Patterns
- [ ] **Table**: 정렬/필터/페이지네이션/선택/행 액션/가상화
- [ ] **List**: 무한 스크롤, 그룹핑, 액션 메뉴, 스와이프 액션
- [ ] **Card Grid**: 반응형 컬럼, 호버 리프트, 액션 오버레이
- [ ] **Timeline**: 수직/수평, 마커, 대체 콘텐츠, 로딩 스켈레톤
- [ ] **Dashboard Widgets**: 그리드 레이아웃, 드래그 앤 드롭, 리사이즈, 설정

### 3.4 Feedback Flow Patterns
- [ ] **Onboarding**: 단계별, 스킵 가능, 진행률, 완료 축하
- [ ] **Empty → Populated**: 상태 전이 애니메이션, 첫 액션 유도
- [ ] **Error Recovery**: 인라인 에러, 토스트, 모달, 재시도/취소/지원
- [ ] **Confirmation Dialog**: 파괴적 액션, 되돌리기 가능 기간, 키보드 단축키

### 3.5 Layout Systems
- [ ] **App Shell**: Header/Sidebar/Content/Footer, 반응형 브레이크포인트
- [ ] **Split View**: 리사이즈 핸들, 최소/최대 폭, 저장/복원
- [ ] **Modal Stack**: 다중 모달, 포커스 스택, ESC 처리, 백드롭
- [ ] **Sheet/Drawer**: 하단/우측/좌측, 크기 프리셋, 스와이프 닫기

---

## Phase 4: Advanced Systems (Week 6-7)

### 4.1 Theming Engine
- [ ] CSS Variables 기반: `:root` + `[data-theme]` + `@media (prefers-*)`
- [ ] `@layer` cascade: `reset`, `tokens`, `base`, `components`, `utilities`, `overrides`
- [ ] 런타임 테마 스위칭: `ThemeProvider` + `useTheme()` + `localStorage` 동기화
- [ ] 브랜드 커스터마이징 API: `extendTheme({ colors: { primary: {...} } })`
- [ ] 테마 빌드 타임 최적화: 사용하지 않는 토큰 트리 쉐이킹

### 4.2 Icon System
- [ ] SVG 스프라이트 생성 (svgr + svg-sprite)
- [ ] React 컴포넌트: `<Icon name="home" size="md" color="currentColor" />`
- [ ] 크기 토큰 연동: `icon.size.{xs,sm,md,lg,xl}`
- [ ] 스트로크 너비 토큰: `icon.stroke.{thin,regular,bold}`
- [ ] 트리 쉐이킹: 사용된 아이콘만 번들 포함

### 4.3 Motion System
- [ ] Motion One 프리셋: `enter`, `exit`, `transition`, `hover`, `focus`, `drag`
- [ ] 스프링 프리셋: `gentle`, `snappy`, `bouncy`, `stiff`
- [ ] Reduced Motion: `prefers-reduced-motion` 미디어 쿼리 + 런타임 토글
- [ ] 레이아웃 애니메이션: `layoutId` 공유 요소 트랜지션 (FLIP)
- [ ] 스크롤 연동: `scroll-driven-animations` 폴리필

### 4.4 Internationalization (i18n)
- [ ] RTL 지원: 논리적 프로퍼티(`margin-inline-start`), `dir` 전파
- [ ] 로케일별 타이포그래피: 폰트 패밀리, 줄높이, 글자 간격 오버라이드
- [ ] 숫자/날짜/통화 포맷팅: `Intl` API 래퍼 컴포넌트
- [ ] 번역 키 네임스페이스: `common`, `form`, `navigation`, `feedback`, `component.{name}`
- [ ] ICU MessageFormat 지원 (복수형, 선택, 날짜/시간)

### 4.5 Accessibility Kit
- [ ] **Focus Management**: `useFocusTrap`, `useFocusRestore`, `useFocusRedirect`
- [ ] **Skip Links**: 메인 콘텐츠, 네비게이션, 푸터 이동
- [ ] **Live Regions**: `PoliteAssertive` 컴포넌트, 토스트/알림 자동 연결
- [ ] **Keyboard Traps**: 모달/드로어/팝오버 포커스 순환
- [ ] **Screen Reader Utilities**: `srOnly`, `announce`, `useAnnouncer`
- [ ] **Color Contrast**: 런타임 대비비 경고 (개발 모드)
- [ ] **Touch Target**: 최소 44×44px (모바일), 48×48dp (Material) 강제

---

## Phase 5: Governance & Documentation (Week 7-8)

### 5.1 Design Review Checklist
- [ ] 5원칙 × 10체크포인트 = 50개 항목
- [ ] Figma 플러그인: 선택 프레임 대상 자동 검증 (토큰 사용 여부, 명암비, 터치 타겟)
- [ ] PR 템플릿에 체크리스트 임베드

### 5.2 Contribution Guide
- [ ] `CONTRIBUTING.md`: 브랜치 전략(`main`, `feature/*`, `fix/*`, `docs/*`), 커밋 컨벤션(Conventional Commits)
- [ ] PR 템플릿: 변경 유형, 스크린샷, 테스트 계획, 마이그레이션 노트
- [ ] 코드 리뷰 가이드: 원칙 준수, 타입 안전성, 접근성, 성능
- [ ] 릴리즈 프로세스: Changesets 워크플로우, 베타/RC/안정화

### 5.3 Versioning Strategy
- [ ] SemVer 준수: Major(브레이킹), Minor(기능), Patch(버그)
- [ ] Changesets 자동 체인지로그: `@essence/changelog` 생성
- [ ] 브레이킹 체인지: 마이그레이션 코드모드(`@essence/codemods`) 필수 제공
- [ ] 디프리케이션 정책: 2 마이너 버전 경고 → 제거

### 5.4 Documentation Site (VitePress)
```
docs/
├── index.md                    # 랜딩: 비전, 빠른 시작, 철학
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   ├── design-principles.md
│   └── design-tokens.md
├── foundations/
│   ├── color.md
│   ├── typography.md
│   ├── spacing.md
│   ├── motion.md
│   ├── elevation.md
│   └── breakpoints.md
├── components/
│   ├── overview.md
│   ├── button.md
│   ├── input.md
│   └── ... (전체 컴포넌트)
├── patterns/
│   ├── forms.md
│   ├── navigation.md
│   ├── data-display.md
│   └── layouts.md
├── guides/
│   ├── theming.md
│   ├── accessibility.md
│   ├── internationalization.md
│   ├── migration.md
│   └── contributing.md
├── api/                        # TypeDoc 자동 생성
│   ├── tokens/
│   ├── react/
│   └── vue/
├── playground/                 # 인터랙티브 예제 (StackBlitz/CodeSandbox 임베드)
├── showcase/                   # 실제 적용 사례
└── changelog.md
```
- [ ] Algolia DocSearch 연동
- [ ] 다국어: 한국어/영어 (i18n 라우팅)
- [ ] 다크 모드 토글, 폰트 크기 조절

### 5.5 Package Publishing
| Package | Description | Entry Points |
|---------|-------------|--------------|
| `@essence/tokens` | JSON + CSS Variables + TypeScript 타입 | `tokens.css`, `tokens.js`, `types.d.ts` |
| `@essence/core` | 프레임워크 독립적 로직 (훅, 유틸, 타입) | `hooks`, `utils`, `types` |
| `@essence/react` | React 18+ 컴포넌트 라이브러리 | 컴포넌트별 진입점 + 번들 |
| `@essence/vue` | Vue 3+ 컴포넌트 라이브러리 | 컴포넌트별 진입점 + 번들 |
| `@essence/icons` | 아이콘 컴포넌트 + 스프라이트 | `Icon`, `icons/*` |
| `@essence/codemods` | 마이그레이션 코드모드 (jscodeshift) | CLI + 프리셋 |

---

## Phase 6: Validation & Launch (Week 8+)

### 6.1 Dogfooding (내부 검증)
- [ ] 프로젝트 A: 관리자 대시보드 (DataGrid, Form, Navigation, Chart 연동)
- [ ] 프로젝트 B: 공개 마케팅 랜딩 + 로그인/가입 플로우 (Marketing + Auth)
- [ ] 피드백 수집: GitHub Discussions, 이슈 템플릿, 주간 회고

### 6.2 Accessibility Audit
- [ ] **자동화**: axe-core CI (모든 스토리/페이지), Lighthouse CI (PR마다)
- [ ] **수동**: NVDA/JAWS/VoiceOver 테스트, 키보드만으로 전체 플로우 완주
- [ ] **VPAT**: WCAG 2.1 AA 준수 성명서 작성
- [ ] **사용자 테스트**: 장애인 사용자 3-5명 모집, 주요 태스크 수행 관찰

### 6.3 Performance Benchmark
| Metric | Tool | Target |
|--------|------|--------|
| Bundle Size (gz) | size-limit | Core < 50KB, Full < 150KB |
| Tree-shaking | bundle-analyzer | 미사용 컴포넌트 0바이트 |
| Runtime Overhead | React Profiler | 마운트 < 5ms, 리렌더 < 1ms |
| Core Web Vitals | Lighthouse | LCP < 2.5s, INP < 200ms, CLS < 0.1 |
| Token Resolution | Custom | CSS Var 해결 < 1ms |

### 6.4 Migration Guide
- [ ] v0 → v1.0.0 마이그레이션 가이드
- [ ] 주요 브레이킹 체인지별 코드모드: `npx @essence/codemods v0-to-v1`
- [ ] 타입 마이그레이션: `ts-morph` 기반 자동 타입 변환
- [ ] 스타일 마이그레이션: Tailwind/Styled Components → Vanilla Extract 변환 가이드

### 6.5 Launch Checklist
- [ ] v1.0.0 태그 생성 (`pnpm changeset version && pnpm publish -r`)
- [ ] GitHub Release: 체인지로그, 마이그레이션 가이드 링크, 데모 앱 링크
- [ ] 문서 사이트 배포: `essence.design` (또는 `essence-ds.vercel.app`)
- [ ] 데모 앱 배포: Next.js + Essence 쇼케이스
- [ ] 커뮤니티 온보딩: Discord/Slack, GitHub Discussions, 트위터/링크드인 발표
- [ ] 첫 기여자 가이드: `good first issue` 라벨 10개 준비

---

## 📦 Deliverables Checklist (최종 산출물)

### Code
- [ ] `packages/tokens` — Theo 파이프라인, 4테마, 다중 포맷 출력
- [ ] `packages/core` — 훅, 유틸, 타입, 테마 엔진, 모션 프리셋
- [ ] `packages/react` — 60+ 컴포넌트, Storybook, 테스트, 문서
- [ ] `packages/vue` — React와 동일 API, Vue 3 Composition API
- [ ] `packages/icons` — 200+ 아이콘, 스프라이트, React/Vue 컴포넌트
- [ ] `packages/tools` — CLI, 코드모드, Figma 동기화 스크립트
- [ ] `packages/docs` — VitePress 사이트, 다국어, 검색, 플레이그라운드

### Design
- [ ] Figma 라이브러리: Variables(토큰), Components(모든 변형), Styles(타이포/색상/이펙트)
- [ ] 디자인 토큰 Figma 플러그인 동기화 (양방향)

### Documentation
- [ ] `principles.md` — 5원칙 상세 가이드
- [ ] `tech-stack.md` — 기술 결정문
- [ ] `CONTRIBUTING.md` — 기여 가이드
- [ ] `CHANGELOG.md` — Changesets 자동 생성
- [ ] VitePress 문서 사이트 (전체 가이드 + API 레퍼런스)

### Governance
- [ ] Design Review Checklist (Figma 플러그인 + PR 템플릿)
- [ ] Release Workflow (Changesets + GitHub Actions)
- [ ] Semantic Versioning + Deprecation Policy
- [ ] Migration Codemods (주요 브레이킹 체인지별)

### Quality
- [ ] CI 파이프라인: Lint, Typecheck, Test, Build, Size, A11y
- [ ] Test Coverage > 90% (라인/브랜치/함수)
- [ ] Accessibility: 100% WCAG AA 자동 통과, 수동 감사 완료
- [ ] Performance: 번들 사이즈, 런타임, CWV 목표 달성

---

## ⚠️ Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| 범위 확장(Scope Creep) | High | High | Phase별 DoD 엄수, "Out of Scope" 명시, 새 요구사항은 백로그 |
| 토큰-컴포넌트 타입 불일치 | Medium | High | Theo + TypeScript 제너릭으로 타입 자동 생성, CI에서 검증 |
| Radix UI 의존성 리스크 | Low | Medium | 래퍼 레이어로 캡슐화, 대안(Headless UI) 마이그레이션 경로 준비 |
| Figma-코드 동기화 드리프트 | Medium | Medium | CI에서 토큰/컴포넌트 해시 비교, 불일치 시 경고 |
| 접근성 회귀 | Medium | High | axe-core PR 게이트, 월 1회 수동 감사, 사용자 테스트 분기 1회 |
| 성능 회귀 | Low | Medium | size-limit + Lighthouse CI 게이트, 번들 분석 주간 리뷰 |
| 문서화 지연 | High | Medium | 컴포넌트 완료 시 문서 필수(DoD), Doc-as-Code 강제 |

---

## 🎯 Milestones

| Milestone | Target Week | Criteria |
|-----------|-------------|----------|
| **M0: Repo Ready** | Week 1 | CI 통과, 토큰 빌드, 빈 컴포넌트 스캐폴드 |
| **M1: Tokens Done** | Week 3 | 4테마 빌드, Figma 동기화, 접근성 통과 |
| **M2: Primitives Done** | Week 4 | 20+ 프리미티브, Storybook, 테스트 90%+ |
| **M3: Composites Done** | Week 6 | 30+ 컴포짓, 패턴 10+, 문서화 |
| **M4: Systems Done** | Week 7 | Theming, Icons, Motion, i18n, A11y Kit |
| **M5: Docs & Governance** | Week 8 | 사이트 배포, 기여 가이드, 릴리즈 워크플로우 |
| **M6: v1.0.0 Launch** | Week 8+ | Dogfooding 2개, A11y 감사, 성능 벤치마크, 배포 |

---

## 📝 Notes for Solo Developer

- **병렬화**: Phase 1(토큰) 완료 후 Phase 2(컴포넌트) + Phase 3(패턴) 일부 병렬 진행 가능
- **우선순위**: 토큰 → 프리미티브 → 컴포짓 → 패턴 → 시스템 → 문서 순으로 가치 전달
- **주간 루틴**: 월(계획), 화-목(개발), 금(리뷰/문서/리팩토링), 주말(학습/실험)
- **기술 부채**: `// TODO:` 주석으로 추적, 분기별 전용 스프린트(1주) 배정