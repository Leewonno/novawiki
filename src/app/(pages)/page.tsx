import type { ApiResponse, DocumentType } from "@/entities";
import { HomeCard, HomeCarousel, HomeRecentCard } from "@/features";
import { fetcher } from "@/lib/utils/fetcher";

async function getPopDocs(): Promise<ApiResponse<DocumentType[]>> {
  return fetcher("/api/document/popular");
}

async function getRecentDocs(): Promise<ApiResponse<DocumentType[]>> {
  return fetcher("/api/document/recent");
}

export default async function Home() {
  const { data: popDocs } = await getPopDocs();
  const { data: recentDocs } = await getRecentDocs();

  return (
    <div className="w-300 flex flex-col items-center gap-10">
      <div className="w-full">
        <HomeCarousel />
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        {/* 오늘의 인기 문서 */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4!">오늘의 인기 문서</h2>
          <div className="flex flex-col gap-3">
            {popDocs?.map((doc, i) => (
              <HomeCard key={`${i}${doc.title}pop`} index={i} doc={doc} />
            ))}
          </div>
        </div>

        {/* 최근 수정 문서 */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4!">최근 수정 문서</h2>
          <div className="rounded-lg border divide-y">
            {recentDocs?.map((doc, i) => (
              <HomeRecentCard key={`${i}${doc.title}rec`} index={i} doc={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
