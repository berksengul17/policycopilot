import { api } from "@/lib/axios";
import type { Doc } from "@/types/document";
import { PIIEntity } from "@/types/pii";

// Replace these when your real BFF routes are ready
export async function fetchDocuments(): Promise<Doc[]> {
  const { data, status } = await api.get("/document/get-all");
  if (status < 200 || status >= 300) throw new Error("Document fetch failed");
  return data;
}

export async function fetchPiiList(fileId: string): Promise<PIIEntity[]> {
  const { data, status } = await api.get(`/document/${fileId}/pii`);
  if (status < 200 || status >= 300) throw new Error("Pii fetch failed");
  return data;
}

export async function uploadDocument(file: File): Promise<Doc> {
  const form = new FormData();
  form.append("file", file);
  const { data, status } = await api.post("/document/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (status < 200 || status >= 300) throw new Error("Document upload failed");
  return data;
}

export async function downloadDocument(fileId: string) {
  const res = await api.get(`/document/download/${fileId}`, {
    responseType: "blob",
  });

  const disposition = res.headers["content-disposition"];
  let filename = "download";
  if (disposition) {
    const match = disposition.match(/filename="?(.*)"?/);
    if (match && match[1]) {
      filename = match[1];
    }
  }

  const url = URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function deleteDocument(fileId: string) {
  const { status } = await api.delete(`/document/delete/${fileId}`);
  if (status < 200 || status >= 300) throw new Error("Document delete failed");
}
