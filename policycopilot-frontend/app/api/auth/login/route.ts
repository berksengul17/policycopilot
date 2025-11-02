import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await server.post("/auth/login", body);

  const headers = new Headers();
  const setCookie = res.headers["set-cookie"];
  if (Array.isArray(setCookie)) {
    for (const c of setCookie) {
      headers.append("Set-Cookie", c);
    }
  } else if (setCookie) {
    headers.set("Set-Cookie", setCookie);
  }

  const ct = res.headers["content-type"];
  headers.set(
    "Content-Type",
    Array.isArray(ct)
      ? ct[0] ?? "application/json"
      : String(ct ?? "application/json")
  );

  const text =
    typeof res.data === "string" ? res.data : JSON.stringify(res.data);
  return new Response(text, { status: res.status, headers });
}
