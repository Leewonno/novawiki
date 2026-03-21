# NOVAWIKI

[![image](https://github.com/user-attachments/assets/ac74ff09-200f-4b7d-81e2-42997570c969)](https://novawiki.vercel.app/)


노바위키는 기존 위키의 느리고 단절된 소통 구조, 그리고 딱딱한 사용자 경험을 개선하기 위해 시작된 플랫폼입니다.

Supabase Realtime Broadcast 기반의 채팅 기능을 통해 이용자 간 실시간 소통이 가능하며,
자체 개발한 마크다운 에디터로 보다 편안하고 직관적인 편집 환경을 제공합니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js, React |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui
| State | TanStack Query, Zustand |
| Backend | Supabase |
| Linter | Biome |

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 인기 문서 및 최근 수정 목록 |
| `/d/[문서명]` | 문서 보기 |
| `/e/[문서명]` | 문서 편집 |
| `/h/[문서명]` | 수정 역사 |
| `/c/[문서명]` | 버전 비교 |
| `/search` | 검색 결과 |

## 프로젝트 구조

```
src/
├── app/           # Next.js App Router (pages, api, actions)
├── entities/      # 도메인 모델 및 쿼리 옵션
├── features/      # 기능별 비즈니스 로직 및 UI
├── components/    # 공용 UI 컴포넌트 (shadcn)
├── packages/      # 내부 패키지 (markdown-parser, markdown-editor)
├── store/         # Zustand 전역 상태
├── lib/           # 유틸리티 및 인프라
└── types/         # 공용 TypeScript 타입
```
