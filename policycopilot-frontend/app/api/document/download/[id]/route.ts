import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = req.headers.get("cookie") ?? "";
  const { id } = await params;

  try {
    const backendRes = await server.get(`/document/download/${id}`, {
      headers: {
        cookie,
      },
      responseType: "blob",
    });

    const headers = new Headers();

    const contentType =
      backendRes.headers["content-type"] ?? "application/octet-stream";
    headers.set("Content-Type", contentType);

    const disposition = backendRes.headers["content-disposition"];
    if (disposition) {
      headers.set("Content-Disposition", disposition);
    }

    return new Response(backendRes.data, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? "Download failed";

    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
