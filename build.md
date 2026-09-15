# build.md — Design System "Essence"

## 1. Vision Statement

> **"모든 픽셀에 의도가 있고, 모든 상호작용에 감정이 있으며, 모든 컴포넌트에 원칙이 있다."**

---

## 2. Core Philosophy (4 Pillars = A+B+C+D 통합)

| Pillar | Source | Key Tenet |
|--------|--------|-----------|
| **Essentialism** (본질주의) | A, C | "복잡성을 해결한 단순함만 남긴다" — First Principles + Apple/Samsung Essential |
| **Emotional Function** (감정적 기능) | B | "기능이 형태를, 감정이 경험을 결정한다" — Form=Function + Form follows Feeling |
| **Technical Precision** (기술적 정밀함) | C, D | "토큰→컴포넌트→패턴→시스템, 단일 소스 오브 트루스" — NVIDIA Elements + Fluent/Astryx |
| **Inclusive Craft** (포용적 장인정신) | A, D | "접근성은 후처리가 아닌 설계 시점부터, 품질은 디테일의 총체" — Apple/Microsoft/Meta |

---

## 3. Design Principles (7대 교집합 → 5로 압축)

### 1. Intentional Minimalism (의도적 미니멀리즘)
> **Apple HIG** "Include just what's necessary" + **Tesla** "Best version cannot be a conversion" + **Samsung DI 5.0** "Essential"
- 불필요한 요소는 과감히 제거, 남은 요소는 존재 이유를 명확히 문서화
- "단순함 ≠ 미니멀리즘" — 본질에 집중한 밀도 있는 단순함 추구

### 2. Feeling-Driven Function (감정이 이끄는 기능)
> **Google M3 Expressive** "Form follows feeling" + **Discord** "Warm and inhabited" + **Ferrari** "Surprise and delight"
- 기능적 완결성은 기본, 그 위에 감정적 공명(신뢰, 즐거움, 안정감) 설계
- 시맨틱 색상/모션/마이크로카피로 감정 신호 전달

### 3. Systematic Coherence (시스템적 일관성)
> **NVIDIA Elements** "Semantic tokens + Component contracts" + **Microsoft Fluent** "Unmistakably Microsoft" + **Meta Astryx** "Gap reports + Swizzle"
- 토큰 → 프리미티브 → 컴포짓 → 패턴 → 레이아웃 단일 진실 계층
- 변경 시 하위 전파 자동화, 브레이킹 체인지 감지/마이그레이션 제공

### 4. Radical Adaptability (근원적 적응성)
> **Samsung One UI** "Adaptive across devices" + **Microsoft** "Natural on every platform" + **Tesla** "OTA updates evolve the product"
- 다크/라이트/하이컨트라스트/브랜드 테마 런타임 전환
- 컨테이너 쿼리/플루이드 타이포/반응형 스페이싱으로 디바이스 무관
- RTL, 로케일별 타이포/숫자/날짜, 접근성 모드(리듀스드 모션/하이컨트라스트) 네이티브 지원

### 5. Crafted for All (모두를 위한 장인정신)
> **Apple** "Design for everyone, priority from start" + **Microsoft** "One for all, all for one" + **Meta** "30% a11y issues via DS" + **Ferrari** "Fit like a glove"
- WCAG AA를 바닥이 아닌 기준으로, AAA 지향
- 키보드/스크린리더/스위치/음성 제어 시나리오 설계 단계부터 포함
- 디테일(포커스 순서, 라이브 리전, 스킵 링크, 에러 복구)은 품질의 척도

---

## 4. Values (우선순위)

1. **Essence > Ornament** (본질 > 장식)
2. **System > Ad-hoc** (시스템 > 임의성)
3. **Human > Pixel** (사람 > 픽셀)
4. **Clarity > Cleverness** (명확함 > 기교)
5. **Evolution > Perfection** (진화 > 완성)

---

## 5. Brand Personality

| Dimension | Expression |
|-----------|------------|
| **Tone** | Confident, Warm, Precise, Curious |
| **Voice** | "우리는 복잡함을 숨기지 않고 해결한다" |
| **Visual** | Essential geometry + Expressive accent + Surgical precision |
| **Motion** | Spring physics, purposeful, respects reduced-motion |

---

## 6. Scope & Constraints

### In Scope
- **Tokens**: Color, Typography, Spacing, Border, Motion, Elevation, Z-index, Breakpoints
- **Components**: Foundations → Primitives → Composites → Patterns (60+ components)
- **Systems**: Theming, Icons, Motion, i18n, Accessibility kit
- **Documentation**: VitePress 사이트, Storybook, Playground, API 레퍼런스
- **Governance**: Review checklist, Contribution guide, Versioning, Migration codemods
- **Distribution**: npm scoped packages, Figma library sync, CLI tools

### Out of Scope
- 마케팅 브랜드 가이드라인 (로고 사용법, 브랜드 보이스 등)
- 3D/모션 디자인 툴 (Spline, After Effects 등)
- 백엔드 아키텍처, API 설계, 인프라
- 특정 비즈니스 로직/도메인 컴포넌트

### Platforms
- **Web**: React 18+, Vue 3+ (동일 API, 프레임워크별 래퍼)
- **Mobile**: React Native (예정), Flutter (토큰만 공유)
- **Desktop**: Electron, Tauri (웹 공유)

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 온보딩 시간 (신규 디자이너/개발자) | < 30분 | Time-to-first-PR 설문 |
| 컴포넌트 재사용률 | > 80% | 코드베이스 스캔 (import 분석) |
| 접근성 자동 통과율 (CI) | 100% WCAG AA | axe-core + Lighthouse CI |
| 디자인-개발 핸드오프 마찰 | Zero | 토큰 직결, Figma Variables → Code 동기화 |
| 테마 전환 비용 | < 1일 | 다크/라이트/하이컨트라스트/브랜드 4테마 |
| 번들 사이즈 (gzipped) | < 50KB (core) | bundle-analyzer 트래킹 |
| 타입 안전성 | 100% | TypeScript strict, no `any` |
| 테스트 커버리지 | > 90% | Vitest + Playwright |

---

## 8. Design Token Architecture (개요)

```
Primitive Tokens (원시값)
  ├── color/raw-{hue}-{step} (예: raw-blue-500)
  ├── spacing/raw-{step} (예: raw-4)
  ├── typography/raw-{fontFamily}-{weight}-{size}
  └── motion/raw-{easing}-{duration}

    ↓ (의미 부여)

Semantic Tokens (의미론적)
  ├── color/{role}/{variant} (예: color/primary/brand, color/surface/elevated)
  ├── spacing/{context} (예: spacing/inline, spacing/stack, spacing/section)
  ├── typography/{role} (예: typography/display-lg, typography/body-md)
  └── motion/{intent} (예: motion/enter, motion/exit, motion/transition)

    ↓ (컴포넌트 바인딩)

Component Tokens (컴포넌트별)
  ├── button/{variant}/{state}/{property}
  ├── card/{variant}/{property}
  └── ...

    ↓ (테마 오버라이드)

Theme Tokens (테마별)
  ├── light/{semantic}
  ├── dark/{semantic}
  ├── high-contrast/{semantic}
  └── brand/{semantic}
```

---

## 9. Component Layer Map

```
Foundations (레이아웃/유틸)
├── Box, Flex, Grid, Container
├── VisuallyHidden, Portal, Slot
└── Provider (Theme, Locale, Motion)

Primitives (상태/로직만, 스타일리스)
├── Button, IconButton, ToggleButton
├── Input, Textarea, Select, Combobox
├── Checkbox, Radio, Switch, Slider
├── Tooltip, Popover, Dialog, AlertDialog
├── Menu, Dropdown, ContextMenu
├── Tabs, Accordion, Collapsible
├── Toast, Alert, Progress, Skeleton, Spinner
├── Avatar, Badge, Tag, Divider
└── FocusScope, FocusTrap, SkipLink

Composites (도메인 조합)
├── Card, CardHeader, CardContent, CardFooter
├── Table, Column, Row, Cell, SortableHeader
├── DataGrid (Virtualized, Filterable, Sortable)
├── Form, Field, FieldError, FieldHint
├── Navigation, Breadcrumb, Pagination, Stepper
├── Sidebar, Header, Footer, AppShell
├── Modal, Drawer, Sheet, Popover
├── List, ListItem, ListSection
├── Tree, TreeItem, TreeView
├── Calendar, DatePicker, DateRangePicker
├── CommandPalette, Search
├── Carousel, Image, Video
└── EmptyState, ErrorBoundary, LoadingState

Patterns (자주 쓰는 조합 레시피)
├── AuthFlow (Login, Register, ForgotPassword)
├── OnboardingFlow
├── SettingsPanel
├── DashboardLayout
├── DataTableToolbar
├── ConfirmationDialog
└── ToastStack
```

---

## 10. Inspiration Mapping (9개 기업 → Essence 원칙)

| Essence Principle | Primary Inspiration | Specific Adoption |
|-------------------|---------------------|-------------------|
| Intentional Minimalism | Apple, Tesla, Samsung | HIG "Include just what's necessary", Tesla First Principles, DI 5.0 Essential |
| Feeling-Driven Function | Google, Discord, Ferrari | M3 Expressive research, Discord "warm/inhabited", Ferrari "surprise & delight" |
| Systematic Coherence | NVIDIA, Microsoft, Meta | Elements semantic tokens, Fluent "Unmistakably", Astryx gap reports/swizzle |
| Radical Adaptability | Samsung, Microsoft, Tesla | One UI responsive, Fluent cross-platform, Tesla OTA evolution |
| Crafted for All | Apple, Microsoft, Meta, Ferrari | Apple accessibility first, Microsoft inclusive, Meta scale a11y, Ferrari ergonomics |