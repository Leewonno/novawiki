"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { type RefObject, useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { chatQueryOptions } from "@/entities";
import { useUserStore } from "@/store/useUserStore";
import { ChatInput } from "./ui/ChatInput";
import { ChatMessage as ChatMessageItem } from "./ui/ChatMessage";

type ChatPanelProps = {
  id: string;
  documentId: number;
  channelRef: RefObject<RealtimeChannel | null>;
};

export function ChatPanel({ id, documentId, channelRef }: ChatPanelProps) {
  const { user, isAuthenticated } = useUserStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading } = useQuery(chatQueryOptions(documentId));
  const messages = response?.data ? [...response.data].reverse() : [];

  // 새 메시지 시 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="px-4 py-3 bg-black rounded-t-xl">
        <p className="text-sm font-semibold text-white">
          {decodeURIComponent(id)} 채팅
        </p>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-muted/20">
        {isLoading ? (
          <p className="flex justify-center items-center gap-1 py-4">
            <Spinner data-icon="inline-start" className="size-3" />
            <span className="text-xs text-muted-foreground">불러오는 중</span>
          </p>
        ) : messages.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            대화가 시작되지 않았습니다.
          </p>
        ) : (
          messages.map((msg, index) => (
            <ChatMessageItem
              key={`${msg.id}_${index}`}
              message={msg}
              isMine={msg.profile_id === user?.id}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <ChatInput
        documentId={documentId}
        isAuthenticated={isAuthenticated}
        channelRef={channelRef}
      />
    </div>
  );
}
