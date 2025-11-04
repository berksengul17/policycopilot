export type DocType = "PDF" | "DOCX" | "CSV";
export type DocStatus = "Queued" | "Scanning" | "Scanned" | "Error";

export interface Doc {
  id: string;
  name: string;
  type: DocType;
  uploadDate: string; // ISO
  piiCount: number;
  highRiskCount: number;
  status: DocStatus;
}
