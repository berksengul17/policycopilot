import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") ?? "";

    const backendRes = await server.get("/document/get-all", {
      headers: {
        cookie,
      },
    });

    return new Response(JSON.stringify(backendRes.data), {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers["content-type"] ?? "application/json",
      },
    });
  } catch (err: any) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? "Upstream error";
    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
