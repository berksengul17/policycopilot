import { server } from "@/lib/axios";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = req.headers.get("cookie") ?? "";
  const { id } = await params;

  try {
    const res = await server.delete(`/document/delete/${id}`, {
      headers: {
        cookie,
      },
    });

    const headers = new Headers();

    return new Response(res.data, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? "Delete failed";

    return new Response(
      typeof data === "string" ? data : JSON.stringify(data),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
