import { Button } from "@/components";
import { WikiViewer } from "@/features";
import Link from "next/link";

const mockDocument = {
  id: "1",
  title: "React",
  lastModified: "2026-01-26",
  content: `
## 개요

React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리로, Meta(구 Facebook)에서 개발하였다.

컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI 요소를 만들 수 있으며, Virtual DOM을 통해 효율적인 렌더링을 제공한다.

## 사건사고

2013년 오픈소스로 공개된 이후, 프론트엔드 개발의 패러다임을 바꾸는 데 큰 역할을 했다.

## 여담

현재 가장 인기 있는 프론트엔드 라이브러리 중 하나이며, Next.js, Gatsby 등 다양한 프레임워크의 기반이 되고 있다.
  `,
  toc: [
    { id: "개요", title: "개요" },
    { id: "사건사고", title: "사건사고" },
    { id: "여담", title: "여담" },
  ],
};

export default async function Document({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: id로 문서 데이터 fetch
  const doc = mockDocument;

  return (
    <div className="w-full max-w-250 mx-auto flex flex-col gap-6">
      {/* 제목, 문서정보, 버튼박스 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{doc.title}</h1>
          <div className="flex items-center gap-2">
            <Link href={`/e/${id}`}>
              <Button variant="outline" size="sm">
                수정
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              삭제
            </Button>
            <Link href={`/h/${id}`}>
              <Button variant="outline" size="sm">
                역사
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          최종 수정: {doc.lastModified}
        </div>
      </div>

      {/* 문서 내용 + 목차 */}
      <div className="flex gap-6">
        {/* 본문 영역 */}
        <div className="flex-1 min-w-0">
          <WikiViewer content={doc.content} />
        </div>

        {/* 목차 사이드바 */}
        <nav className="w-40 shrink-0">
          <div className="sticky top-6 rounded-lg border p-4">
            <h3 className="font-semibold mb-3">목차</h3>
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              {doc.toc.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {index + 1}. {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </div>
  );
}
