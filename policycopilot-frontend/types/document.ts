export type DocType = "PDF" | "DOCX" | "CSV";
export type DocStatus = "Queued" | "Scanning" | "Scanned" | "Error";

export interface Doc {
  id: string;
  name: string;
  type: DocType;
  uploadedAt: string; // ISO
  piiCount: number;
  highRisk: number;
  status: DocStatus;
}
