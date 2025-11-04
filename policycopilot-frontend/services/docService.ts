import { api } from "@/lib/axios";
import type { Doc } from "@/types/document";

// Replace these when your real BFF routes are ready
export async function fetchDocuments(): Promise<Doc[]> {
  const { data, status } = await api.get("/document/get-all");
  if (status < 200 || status >= 300) throw new Error("Document fetch failed");
  return data;
}

export async function uploadDocument(file: File): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  const { status } = await api.post("/document/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (status < 200 || status >= 300) throw new Error("Document upload failed");
}
