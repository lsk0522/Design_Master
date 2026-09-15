# Essence Design Principles — Decision Log

> 이 문서는 5대 핵심 원칙의 **결정 근거(Why)**, **적용 가이드(How)**, **안티패턴(Don't)**을 기록합니다.

---

## 1. Intentional Minimalism (의도적 미니멀리즘)

> **"모든 요소는 존재 이유를 가진다"**

### Why (결정 근거)
- **Apple HIG**: "Include just what's necessary. Simplicity isn't minimalism."
- **Tesla First Principles**: "Best version cannot be a conversion." 레거시 제약 없이 본질부터 재설계
- **Samsung DI 5.0 Essential**: "불필요한 요소 제거, 원래 의도와 목적에 집중"
- **Ferrari**: "Simplicity is complexity resolved" (브랑쿠시) — 복잡성을 해결한 결과로서의 단순함

### How (적용 가이드)
| 상황 | 적용 방법 |
|------|-----------|
| 새 컴포넌트 설계 | "이 요소가 없으면 핵심 기능이 깨지는가?" → No면 제거 |
| 기존 컴포넌트 리팩토링 | Props/변형/상태 중 사용률 < 5%인 것 제거 검토 |
| 레이아웃 구성 | 여백/간격/계층은 토큰으로 통일, 임의 값 금지 |
| 디자인 리뷰 | "이게 왜 여기 있는가?" 3번 묻기 |

### Don't (안티패턴)
- ❌ "혹시 모르니까" 넣어두는 여분 props/상태/변형
- ❌ 디자이너/개발자 편의를 위한 임의 여백/크기/색상
- ❌ "나중에 쓸 수 있으니까" 미리 만드는 변형
- ❌ 단순함을 위한 단순함(기능 손실 동반)

### 측정 지표
- 컴포넌트당 평균 Props 수 ≤ 8개
- 변형(variant) 수 ≤ 4개
- 사용하지 않는 CSS/JS 번들 크기 0바이트

---

## 2. Feeling-Driven Function (감정이 이끄는 기능)

> **"기능이 형태를, 감정이 경험을 결정한다"**

### Why (결정 근거)
- **Google M3 Expressive**: "Form follows feeling" — 연구(46 studies, 18k 참가자) 증명: 표현적 디자인이 사용성 4x 향상
- **Discord**: "Warm and inhabited" — 차가운 기업 도구가 아닌 따뜻한 커뮤니티 공간
- **Ferrari**: "Surprise and delight" — 기능 완결 위에 감정적 공명(신뢰, 즐거움, 안정감) 설계
- **Meta**: "Expressive, Proud, Uniting" — 브랜드 레이어 + 표현 레이어 분리

### How (적용 가이드)
| 레이어 | 감정 신호 | 구현 |
|--------|-----------|------|
| **색상** | 신뢰(파랑), 경고(빨강), 성공(초록), 브랜드(보라) | 시맨틱 색상 토큰 필수 사용 |
| **모션** | 부드러움(진입), 빠른 반응(호버), 안정감(포커스) | 스프링 물리학 기반 모션 토큰 |
| **마이크로카피** | 친근함, 명확함, 안심 | 톤앤매뉴얼 준수 |
| **피드백** | 즉각적, 예측 가능, 복구 가능 | 토스트/알림/스켈레톤/프로그레스 |
| **일러스트/아이콘** | 따뜻함, 개성, 브랜드 | 라운드 형태, 표현적 스트로크 |

### Don't (안티패턴)
- ❌ "기능만 되면 된다"며 감정적 디테일 생략
- ❌ 장식용 애니메이션(목적 없는 모션)
- ❌ 차가운 시스템 메시지("Error 404" vs "페이지를 찾을 수 없어요. 다시 시도해 보세요.")
- ❌ 브랜드 색상 남용(의미 없는 곳에 브랜드 색상)

### 측정 지표
- 사용자 만족도 조사(NPS) ≥ 50
- 작업 완료 시간 단축 ≥ 20%
- 오류 복구율 ≥ 90%

---

## 3. Systematic Coherence (시스템적 일관성)

> **"토큰에서 패턴까지 단일 진실"**

### Why (결정 근거)
- **NVIDIA Elements**: "Semantic tokens + Component contracts" — 토큰→컴포넌트 타입 직결, 브레이킹 체인지 감지
- **Microsoft Fluent**: "Unmistakably Microsoft" — 시그니처 경험(색상, 사운드, 아이콘)으로 브랜드 통일
- **Meta Astryx**: "Gap reports + Swizzle" — 시스템이 게이트가 아닌 이네이블러, 사용 데이터가 진실

### How (적용 가이드)
| 계층 | 단일 진실 소스 | 변경 전파 |
|------|----------------|-----------|
| **Primitive Tokens** | `packages/tokens/src/primitive/*.json` | Theo → 모든 포맷 자동 생성 |
| **Semantic Tokens** | `packages/tokens/src/semantic/*.json` | CSS Variables, TS 타입, Figma Variables |
| **Component Tokens** | `packages/tokens/src/component/*.json` | 컴포넌트 스타일 직접 바인딩 |
| **Components** | `packages/react/src/components/*` | Storybook + Tests + Docs 동시 검증 |
| **Patterns** | `packages/react/src/patterns/*` | 컴포넌트 조합 레시피 문서화 |

### 변경 관리 프로세스
1. **토큰 변경** → `pnpm build:tokens` → 모든 패키지 타입 체크 → PR
2. **컴포넌트 변경** → Storybook 시각적 검증 → 테스트 통과 → PR
3. **브레이킹 체인지** → Changeset `major` → 마이그레이션 코드모드 필수 제공

### Don't (안티패턴)
- ❌ 하드코딩된 색상/크기/간격
- ❌ 토큰 없이 직접 CSS 작성
- ❌ Figma와 코드 간 수동 동기화
- ❌ 컴포넌트별 독립적인 스타일 시스템

### 측정 지표
- 토큰 커버리지 100% (하드코딩 0개)
- Figma-코드 토큰 해시 일치율 100%
- 브레이킹 체인지당 마이그레이션 코드모드 100% 제공

---

## 4. Radical Adaptability (근원적 적응성)

> **"디바이스/테마/로케일/능력에 무한 적응"**

### Why (결정 근거)
- **Samsung One UI**: "Adaptive across devices" — 폴더블/태블릿/모바일/DEX 통합 대응
- **Microsoft Fluent**: "Natural on every platform" — 플랫폼 네이티브 패턴 존중 + 크로스플랫폼 일관성
- **Tesla OTA**: "Product gets better over time" — 소프트웨어 정의 제품, 런타임 진화

### How (적용 가이드)
| 적응 축 | 구현 전략 |
|---------|-----------|
| **테마** | CSS Variables + `[data-theme]` + `@media (prefers-*)` + 런타임 스위칭 |
| **다크모드** | 시맨틱 토큰 기반 자동 전환, 브랜드 색상 접근성 보정 |
| **하이컨트라스트** | `@media (prefers-contrast: more)` 전용 토큰 세트 |
| **반응형** | 컨테이너 쿼리 + 플루이드 타이포그래피 + 플루이드 스페이싱 |
| **RTL** | 논리적 프로퍼티(`margin-inline-start`) + `dir` 전파 |
| **로케일** | ICU MessageFormat + 폰트/줄높이/숫자/날짜 로케일별 오버라이드 |
| **접근성** | `prefers-reduced-motion` 네이티브 지원, 키보드/스크린리더 시나리오 설계 단계 포함 |

### Don't (안티패턴)
- ❌ 미디어 쿼리 하드코딩(`@media (max-width: 768px)`)
- ❌ 다크모드 별도 컴포넌트/스타일 작성
- ❌ RTL 미지원(논리적 프로퍼티 미사용)
- ❌ 고정 폰트 크기/여백(px 단위 남용)

### 측정 지표
- 테마 전환 비용 < 1일 (4테마: light/dark/high-contrast/brand)
- 새 브레이크포인트 추가 시 변경 파일 ≤ 3개
- RTL 지원 컴포넌트 100%

---

## 5. Crafted for All (모두를 위한 장인정신)

> **"접근성과 품질은 타협하지 않는다"**

### Why (결정 근거)
- **Apple**: "Design for everyone. Treat accessibility as a priority from the start"
- **Microsoft**: "One for all, all for one" — 다양한 능력/관점 포함이 더 나은 솔루션 생성
- **Meta**: "30% a11y issues remediated via DS" — 시스템 레벨에서 접근성 해결
- **Ferrari**: "Fit like a glove" — 인체공학, 착용감, 운전자 중심 디테일

### How (적용 가이드)
| 영역 | 최소 기준 | 지향 목표 |
|------|-----------|-----------|
| **색상 대비** | WCAG AA (4.5:1) | WCAG AAA (7:1) |
| **키보드 내비게이션** | 모든 인터랙티브 요소 포커스 가능 | 논리적 탭 순서, 스킵 링크, 포커스 트랩 |
| **스크린리더** | 시맨틱 HTML, ARIA 라벨/라이브 리전 | 자연스러운 읽기 순서, 의미 있는 알림 |
| **터치 타겟** | 최소 44×44px (iOS) / 48×48dp (Material) | 여유 있는 터치 영역, 제스처 대안 제공 |
| **모션** | `prefers-reduced-motion` 존중 | 기능적 모션만 유지, 장식 모션 비활성화 |
| **확대/축소** | 200% 확대 시 기능 손실 없음 | 400% 확대 지원 |

### 개발 프로세스 통합
1. **설계 단계**: 접근성 시나리오 명세(키보드/스크린리더/스위치/음성)
2. **구현 단계**: axe-core CI 게이트, 스토리북 a11y 애드온
3. **검증 단계**: NVDA/JAWS/VoiceOver 수동 테스트, 장애인 사용자 테스트 분기 1회
4. **문서화**: VPAT(자발적 제품 접근성 템플릿) 작성

### Don't (안티패턴)
- ❌ "나중에 접근성 추가" (후처리 접근)
- ❌ `div`로 버튼 만들기 (`role="button"`만 추가)
- ❌ 포커스 아웃라인 제거(`outline: none` without `:focus-visible`)
- ❌ 색상만으로 정보 전달(빨간색 테두리 = 에러, 아이콘/텍스트 없음)
- ❌ 자동 재생/루프 애니메이션(일시정지/정지 컨트롤 없음)

### 측정 지표
- axe-core 자동 검사 100% 통과 (CI 게이트)
- 수동 스크린리더 테스트 주요 플로우 100% 완주
- WCAG 2.1 AA 준수 VPAT 공개
- 키보드만으로 전체 주요 태스크 완료 가능

---

## 원칙 간 우선순위 (충돌 시)

```
1. Crafted for All (접근성/품질) — 타협 불가
2. Intentional Minimalism (본질) — 복잡성 제거
3. Systematic Coherence (일관성) — 시스템 무결성
4. Feeling-Driven Function (감정) — 사용자 경험 품질
5. Radical Adaptability (적응성) — 확장성
```

> **예외**: 법적/규제 요구사항(접근성 법규 등)은 항상 1순위

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 결정자 |
|------|------|-----------|--------|
| 2026-09-13 | 0.1.0 | 초기 원칙 정의 (9개 기업 분석 기반) | - |