import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select(
      `*,
      profile:chat_messages_profile_id_fkey1 (
        nick,
        userid
      )`,
    )
    .eq("document_id", Number(id))
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return Response.json(
      {
        success: false,
        data: null,
        errorCode: "DB_ERROR",
        message: "메시지 조회 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }

  return Response.json({ success: true, data });
}
