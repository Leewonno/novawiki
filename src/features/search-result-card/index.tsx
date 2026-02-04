"use client";

import Link from "next/link";
import { Button } from "@/components";

type SearchResultCardProps = {
  doc: {
    id: string;
    title: string;
    summary: string;
  };
};

export function SearchResultCard({ doc }: SearchResultCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
      <Link href={`/d/${doc.id}`} className="flex-1 min-w-0 cursor-pointer">
        <span className="font-medium">{doc.title}</span>
        <span className="text-muted-foreground"> - {doc.summary}</span>
      </Link>
      <div className="flex items-center gap-2 ml-4 shrink-0">
        <Link href={`/e/${doc.id}`}>
          <Button variant="outline" size="sm">
            수정
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          삭제
        </Button>
        <Link href={`/h/${doc.id}`}>
          <Button variant="outline" size="sm">
            역사
          </Button>
        </Link>
      </div>
    </div>
  );
}
