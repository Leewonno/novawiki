export type ChatMessage = {
  id: string;
  document_id: number;
  profile_id: string;
  content: string;
  created_at: string;
  profile: { nick: string } | null;
};
