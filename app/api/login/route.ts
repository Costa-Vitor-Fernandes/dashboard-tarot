import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { password } = await req.json();
  const validPassword = process.env.DASHBOARD_PASSWORD;
  console.log("valido", validPassword);

  if (password == validPassword) {
    console.log("password correto", password);
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
