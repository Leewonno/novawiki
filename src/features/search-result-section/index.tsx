"use client";

import { Button } from "@/components";
import { SearchResultCard } from "../search-result-card";
import Link from "next/link";

type SearchDoc = {
  id: string;
  title: string;
  summary: string;
};

type SearchResultSectionProps = {
  title: string;
  results: SearchDoc[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  searchQuery: string;
};

export function SearchResultSection({
  title,
  results,
  hasMore = true,
  onLoadMore,
  searchQuery,
}: SearchResultSectionProps) {
  const isEmpty = results.length === 0;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-col gap-3">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">검색결과가 없습니다.</p>
            <Link
              href={`/e/new?title=${encodeURIComponent(searchQuery)}`}
              className="mt-4"
            >
              <Button>문서 생성</Button>
            </Link>
          </div>
        ) : (
          <>
            {results.map((doc) => (
              <SearchResultCard key={doc.id} doc={doc} />
            ))}
            {hasMore && (
              <Button variant="outline" className="w-full" onClick={onLoadMore}>
                더 보기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
