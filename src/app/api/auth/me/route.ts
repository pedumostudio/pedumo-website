import { getSessionEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const email = await getSessionEmail(request);
  return Response.json({ ok: true, email });
}
