import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = req.headers.get("cookie") ?? "";
  const { id } = await params;

  try {
    const res = await server.get(`/document/${id}/pii`, {
      headers: {
        cookie,
      },
    });

    const headers = new Headers();

    const contentType = res.headers["content-type"] ?? "application/json";
    headers.set("Content-Type", contentType);

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? "Fetching pii list failed";

    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
