export type DocType = "PDF" | "DOCX" | "CSV";
export type DocStatus = "QUEUED" | "SCANNING" | "SCANNED" | "ERROR";

export interface Doc {
  id: string;
  name: string;
  type: DocType;
  uploadDate: string; // ISO
  piiCount: number;
  highRiskCount: number;
  status: DocStatus;
}

export type SelectedDoc = {
  docId: string;
  purpose: "View" | "Delete";
};
