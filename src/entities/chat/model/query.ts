import { defaultQueryKey, defaultQueryOptions } from "@/lib/utils/query";
import type { ChatMessage } from "./types";

export const chatQueryKey = (id: number) => defaultQueryKey(["chat", id]);

export const chatQueryOptions = (id: number) =>
  defaultQueryOptions<ChatMessage[]>(chatQueryKey(id), `/api/chat/${id}`);
