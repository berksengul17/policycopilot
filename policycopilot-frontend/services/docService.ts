import type { Doc } from "@/types/document";

// Replace these when your real BFF routes are ready
export async function fetchDocuments(): Promise<Doc[]> {
  // Example: const { data } = await http.get("/docs");
  // TEMP demo: simulate network & return mock data
  await new Promise((r) => setTimeout(r, 250));
  return [
    {
      id: "1",
      name: "Customer_Exports_Sept.csv",
      type: "CSV",
      uploadedAt: "2025-10-31T12:05:00Z",
      piiCount: 128,
      highRisk: 6,
      status: "Scanned",
    },
    {
      id: "2",
      name: "HR_Onboarding_Form.pdf",
      type: "PDF",
      uploadedAt: "2025-10-30T18:20:00Z",
      piiCount: 42,
      highRisk: 1,
      status: "Scanned",
    },
    {
      id: "3",
      name: "Support_Thread_Sample.docx",
      type: "DOCX",
      uploadedAt: "2025-10-29T09:10:00Z",
      piiCount: 9,
      highRisk: 0,
      status: "Queued",
    },
  ];
}

export async function uploadDocument(file: File): Promise<Doc> {
  // Example real call:
  // const form = new FormData();
  // form.append("file", file);
  // const { data } = await http.post("/uploads", form, {
  //   headers: { "Content-Type": "multipart/form-data" },
  // });
  // return data;

  await new Promise((r) => setTimeout(r, 350));
  const ext = file.name.toLowerCase();
  const type = ext.endsWith(".pdf")
    ? "PDF"
    : ext.endsWith(".csv")
    ? "CSV"
    : "DOCX";
  return {
    id: String(Date.now()),
    name: file.name,
    type,
    uploadedAt: new Date().toISOString(),
    piiCount: 0,
    highRisk: 0,
    status: "Queued",
  };
}

export async function logout(): Promise<void> {
  // await http.post("/auth/logout");
  window.location.href = "/api/auth/logout"; // keep cookie clearing server-side
}
