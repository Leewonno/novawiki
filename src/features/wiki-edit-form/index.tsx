"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WikiEditor } from "../wiki-editor";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components";

type WikiEditFormProps = {
  documentId: string;
  initialTitle: string;
  initialContent: string;
  isNew: boolean;
};

export function WikiEditForm({
  documentId,
  initialTitle,
  initialContent,
  isNew,
}: WikiEditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [comment, setComment] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSave = () => {
    if (!agreed) return;
    // TODO: 저장 API 호출
    if (isNew) {
      router.push("/");
    } else {
      router.push(`/d/${documentId}`);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      router.push("/");
    } else {
      router.push(`/d/${documentId}`);
    }
  };

  return (
    <div className="w-full max-w-300 mx-auto flex flex-col gap-6">
      {/* 문서 제목 */}
      <Input
        type="text"
        placeholder="문서 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg h-12"
      />

      {/* 마크다운 에디터 + 미리보기 */}
      <WikiEditor content={initialContent} />

      {/* 코멘트 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="edit-comment" className="text-sm font-medium">
          코멘트
        </label>
        <Textarea
          id="edit-comment"
          placeholder="수정된 내용에 대한 설명을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>

      {/* 동의 체크박스 + 저장/취소 */}
      <div className="flex items-center justify-between border-t pt-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="size-4 cursor-pointer"
          />
          저장하면 사용자 ID로 영구히 기록됩니다. 동의하십니까?
        </label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleSave}
            disabled={!agreed || !title.trim()}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
