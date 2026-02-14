import type { ApiResponse, DocumentType } from "@/entities";
import { WikiEditForm } from "@/features";
import { fetcher } from "@/lib/utils/fetcher";

async function getDoc(id: string): Promise<ApiResponse<DocumentType>> {
  return fetcher(`/api/document/doc?id=${id}`);
}

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // 문서 가져오기
  const { data } = await getDoc(id);

  // 새 문서로 작성할지 확인
  const isNew = id === "new" || !data;

  // TODO: id로 문서 데이터 fetch (신규면 빈 값)
  const title = isNew ? "" : data.title;
  const content = isNew ? "" : data.content;

  return (
    <WikiEditForm initialTitle={title} initialContent={content} isNew={isNew} />
  );
}
