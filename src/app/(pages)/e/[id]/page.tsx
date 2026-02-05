import { WikiEditForm } from "@/features";

const mockDocument = {
  title: "React",
  content: `## 개요

React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리로, Meta(구 Facebook)에서 개발하였다.

## 특징

- 컴포넌트 기반 아키텍처
- Virtual DOM
- 단방향 데이터 흐름
`,
};

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  // TODO: id로 문서 데이터 fetch (신규면 빈 값)
  const title = isNew ? "" : mockDocument.title;
  const content = isNew ? "" : mockDocument.content;

  return (
    <WikiEditForm
      documentId={id}
      initialTitle={title}
      initialContent={content}
      isNew={isNew}
    />
  );
}
