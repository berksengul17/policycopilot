import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = await server.post("/auth/logout");

    const headers = new Headers();

    const setCookie = res.headers["set-cookie"];
    if (Array.isArray(setCookie)) {
      for (const c of setCookie) {
        headers.append("Set-Cookie", c);
      }
    } else if (setCookie) {
      headers.set("Set-Cookie", setCookie);
    }

    return new Response(null, {
      status: res.status,
      headers: {
        ...Object.fromEntries(headers),
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(`Error: ${e}`);
    return new Response(JSON.stringify({ message: "Logout failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
