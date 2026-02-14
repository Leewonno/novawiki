import type { ApiResponse, HistoryType } from "@/entities";
import { HistoryList } from "@/features";
import { fetcher } from "@/lib/utils/fetcher";

async function getHistory(id: string): Promise<ApiResponse<HistoryType[]>> {
  return fetcher(`/api/document/history?id=${id}`);
}

export default async function History({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, errorCode } = await getHistory(id);

  if (errorCode) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>존재하지 않는 문서입니다.</div>;
  }

  const title = decodeURI(id);

  return <HistoryList title={title} history={data} />;
}
