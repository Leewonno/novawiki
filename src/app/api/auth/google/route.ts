import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/api/auth/callback`,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) {
    return Response.json(
      {
        success: false,
        data: null,
        errorCode: "LOGIN_ERROR",
        message: "Google 로그인 URL 생성 실패",
      },
      { status: 500 },
    );
  }

  return Response.json({
    success: true,
    data,
    errorCode: null,
    message: null,
  });
}
