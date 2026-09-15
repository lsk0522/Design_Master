# Design System "Essence"

> 9개 글로벌 기업(Apple, Samsung, NVIDIA, Ferrari, Discord, Google, Meta, Tesla, Microsoft)의 디자인 철학을 분석해 **장점만 추출·통합**한 나만의 디자인 기준 시스템.

## 📁 Repository Structure

```
essence/
├── README.md           ← 이 파일 (전체 요약 + 네비게이션)
├── build.md            ← 철학/비전/원칙/가치/성공지표
├── plan.md             ← 6단계 8주 실행 계획 (상세 태스크/산출물/검증)
├── principles.md       ← 5대 핵심 원칙 상세 가이드 (Phase 0 산출)
├── tech-stack.md       ← 기술 스택 결정문 + 트레이드오프 분석
├── packages/
│   ├── tokens/         ← 디자인 토큰 (JSON + Theo 변환)
│   ├── core/           ← 프레임워크 독립적 핵심 로직
│   ├── react/          ← React 컴포넌트 라이브러리
│   ├── vue/            ← Vue 컴포넌트 라이브러리
│   ├── docs/           ← VitePress 문서 사이트
│   └── tools/          ← CLI, 코드모드, Figma 동기화 스크립트
├── .github/workflows/  ← CI/CD (lint, test, chromatic, publish)
└── CHANGELOG.md        ← Changesets 자동 생성
```

## 🎯 Core Philosophy (4 Pillars)

| Pillar | Integrates | Key Insight |
|--------|------------|-------------|
| **Essentialism** | A, C | First Principles + "Simplicity is complexity resolved" |
| **Emotional Function** | B | "Form follows feeling" + "Function informs form" |
| **Technical Precision** | C, D | Single source of truth: Token → Component → Pattern |
| **Inclusive Craft** | A, D | Accessibility at design-time, not afterthought |

## 🧭 5 Design Principles

1. **Intentional Minimalism** — 모든 요소는 존재 이유를 가진다
2. **Feeling-Driven Function** — 감정이 사용성을 이끈다
3. **Systematic Coherence** — 토큰에서 패턴까지 단일 진실
4. **Radical Adaptability** — 디바이스/테마/로케일/능력에 무한 적응
5. **Crafted for All** — 접근성과 품질은 타협하지 않는다

## 🚀 Quick Start (예정)

```bash
# 설치
npm install @essence/react @essence/tokens

# 토큰 사용
import { colors, spacing, typography } from '@essence/tokens'

# 컴포넌트 사용
import { Button, Card, Dialog } from '@essence/react'
```

## 📊 Progress Tracker

- [ ] Phase 0: Foundation
- [ ] Phase 1: Design Tokens
- [ ] Phase 2: Core Components
- [ ] Phase 3: Patterns & Layouts
- [ ] Phase 4: Advanced Systems
- [ ] Phase 5: Governance & Docs
- [ ] Phase 6: Validation & Launch

## 🔗 References

- [9개 기업 분석 요약](./ANALYSIS_SUMMARY.md) ← 별도 파일로 분리 권장
- [원칙 결정 로그](./principles.md)
- [기술 스택 결정문](./tech-stack.md)