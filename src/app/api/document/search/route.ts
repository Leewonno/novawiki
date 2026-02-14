import { createClient } from "@/lib/supabase/server";
import { decomposeKorean } from "@/lib/utils/common";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const supabase = await createClient();

  // 제목
  const titleQuery = supabase
    .from("document")
    .select("*")
    .eq("isBlock", false)
    .eq("isDisplay", true)
    .ilike("letters", `%${decomposeKorean(q)}%`)
    .order("updated_at", { ascending: false })
    .limit(10);

  const { data: titleData, error: titleError } = await titleQuery;
  if (titleError) {
    return Response.json(
      {
        success: false,
        data: null,
        errorCode: "DB_ERROR",
        message: "데이터 조회 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }

  // 내용
  const contentQuery = supabase
    .from("document")
    .select("*")
    .eq("isBlock", false)
    .eq("isDisplay", true)
    .ilike("content", `%${decomposeKorean(q)}%`)
    .order("updated_at", { ascending: false })
    .limit(10);

  const { data: contentData, error: contentError } = await contentQuery;
  if (contentError) {
    return Response.json(
      {
        success: false,
        data: null,
        errorCode: "DB_ERROR",
        message: "데이터 조회 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }

  const result = [titleData, contentData];

  return Response.json({
    success: true,
    data: result,
    errorCode: null,
    message: null,
  });
}
