import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { ApiResponse, DocumentType } from "@/entities";
import { fetcher } from "@/lib/utils/fetcher";
import { DocumentView } from "@/widgets";

async function getDoc(id: string): Promise<ApiResponse<DocumentType>> {
  return fetcher(`/api/document/doc?id=${id}`, 0);
}

async function getHistoryDoc(
  id: string,
  v: string,
): Promise<ApiResponse<DocumentType>> {
  return fetcher(`/api/document/version?id=${id}&v=${v}`, 0);
}

export default async function Document({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ v?: string }>;
}) {
  const { id } = await params;
  const { v } = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["document", id, v ?? null],
    queryFn: () => (v ? getHistoryDoc(id, v) : getDoc(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentView id={id} v={v} />
    </HydrationBoundary>
  );
}
