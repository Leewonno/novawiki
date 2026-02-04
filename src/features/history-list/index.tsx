"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import Link from "next/link";

type HistoryItem = {
  version: number;
  date: string;
  user: string;
  action: string;
};

type HistoryListProps = {
  documentId: string;
  documentTitle: string;
  history: HistoryItem[];
};

export function HistoryList({
  documentId,
  documentTitle,
  history,
}: HistoryListProps) {
  const router = useRouter();
  const [prevVersion, setPrevVersion] = useState<number | null>(
    history.length > 1 ? history[1].version : null
  );
  const [nextVersion, setNextVersion] = useState<number | null>(
    history.length > 0 ? history[0].version : null
  );

  const handleCompare = () => {
    if (prevVersion !== null && nextVersion !== null) {
      router.push(`/c/${documentId}?prev=${prevVersion}&next=${nextVersion}`);
    }
  };

  return (
    <div className="w-full max-w-250 mx-auto flex flex-col gap-6">
      {/* 상단 제목 및 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          &apos;{documentTitle}&apos;의 이력 결과
        </h1>
        <div className="flex items-center gap-2">
          <Link href={`/e/${documentId}`}>
            <Button variant="outline" size="sm">
              수정
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleCompare}
            disabled={prevVersion === null || nextVersion === null}
          >
            비교
          </Button>
        </div>
      </div>

      {/* 이력 테이블 */}
      <div className="rounded-lg border overflow-hidden">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[60px_60px_1fr_120px_120px_100px] gap-4 px-4 py-3 bg-muted/50 text-sm font-medium">
          <div className="text-center">이전</div>
          <div className="text-center">현재</div>
          <div>버전</div>
          <div>수정일시</div>
          <div>사용자</div>
          <div>작업내용</div>
        </div>

        {/* 이력 목록 */}
        <div className="divide-y">
          {history.map((item) => (
            <div
              key={item.version}
              className="grid grid-cols-[60px_60px_1fr_120px_120px_100px] gap-4 px-4 py-3 text-sm hover:bg-muted/30 transition-colors"
            >
              <div className="flex justify-center">
                <input
                  type="radio"
                  name="prevVersion"
                  checked={prevVersion === item.version}
                  onChange={() => setPrevVersion(item.version)}
                  className="size-4 cursor-pointer"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="radio"
                  name="nextVersion"
                  checked={nextVersion === item.version}
                  onChange={() => setNextVersion(item.version)}
                  className="size-4 cursor-pointer"
                />
              </div>
              <div className="font-medium">v{item.version}</div>
              <div className="text-muted-foreground">{item.date}</div>
              <div>{item.user}</div>
              <div className="text-muted-foreground">{item.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
