"use client";

import type { ChatMessage as ChatMessageType } from "@/entities";
import { formatDateTime } from "@/lib/utils/common";

type ChatMessageProps = {
  message: ChatMessageType;
  isMine: boolean;
};

export function ChatMessage({ message, isMine }: ChatMessageProps) {
  const nick = message.profile?.nick ?? "알 수 없음";
  const initial = nick.charAt(0);

  if (isMine) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%]">
          <p className="text-[10px] text-muted-foreground mb-1 text-right">
            {nick} · {formatDateTime(message.created_at).slice(11)}
          </p>
          <div className="bg-gray-400 text-white rounded-tl-2xl rounded-tr-sm rounded-b-2xl px-3 py-2 text-sm wrap-break-word">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-start">
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
        {initial}
      </div>
      <div className="max-w-[75%]">
        <p className="text-[10px] text-muted-foreground mb-1">
          {nick} · {formatDateTime(message.created_at).slice(11)}
        </p>
        <div className="bg-white border border-border rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-3 py-2 text-sm wrap-break-word">
          {message.content}
        </div>
      </div>
    </div>
  );
}
