import { NextRequest } from "next/server";
import { server } from "@/lib/axios";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const formData = await req.formData();

    const backendRes = await server.post("/document/upload", formData, {
      headers: {
        cookie,
        "Content-Type": req.headers.get("Content-Type"),
      },
      maxBodyLength: Infinity,
    });

    const headers = new Headers();
    const setCookie = backendRes.headers["set-cookie"];
    if (Array.isArray(setCookie)) {
      setCookie.forEach((c) => headers.append("Set-Cookie", c));
    } else if (setCookie) {
      headers.set("Set-Cookie", setCookie);
    }
    headers.set(
      "Content-Type",
      backendRes.headers["content-type"] ?? "application/json"
    );

    return new Response(
      typeof backendRes.data === "string"
        ? backendRes.data
        : JSON.stringify(backendRes.data),
      {
        status: backendRes.status,
        headers,
      }
    );
  } catch (err: any) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? "Upload failed";
    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
