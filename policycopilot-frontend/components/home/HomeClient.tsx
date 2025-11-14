"use client";

import { useDocuments } from "@/hooks/useDocuments";
import { SelectedDoc } from "@/types/document";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModel";
import DocumentTable from "./DocumentTable";
import PiiListModal from "./PiiListModal";
import Sidebar from "./Sidebar";
import { PIIEntity } from "@/types/pii";
import { useLogin } from "@/hooks/useLogin";

export default function HomeClient() {
  const { state, actions, refs } = useDocuments();
  const { logout } = useLogin();
  const [selectedDoc, setSelectedDoc] = useState<SelectedDoc | null>(null);
  const [piiList, setPiiList] = useState<PIIEntity[]>([]);

  const handleDocSelect = (selectedDoc: SelectedDoc) => {
    setSelectedDoc(selectedDoc);
  };

  const handleClose = () => setSelectedDoc(null);

  const handleConfirm = () => {
    if (selectedDoc == null || selectedDoc?.purpose != "Delete") return;
    actions.remove(selectedDoc.docId);
    setSelectedDoc(null);
  };

  const handlePiiEntities = async () => {
    if (selectedDoc != null && selectedDoc.purpose == "View") {
      const data = await actions.loadPiiList(selectedDoc.docId);
      setPiiList(data);
    }
  };

  useEffect(() => {
    handlePiiEntities();
  }, [selectedDoc]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-3">
            <Sidebar
              userName="Berk Şengül"
              stats={{
                docs: state.docs.length,
                pii: state.totalPII,
                high: state.totalHighRisk,
                queued: state.queuedCount,
              }}
              onUploadClick={actions.onPickFileClick}
              fileInput={refs.fileRef}
              onFileChange={actions.onFileChange}
              onLogout={logout}
            />
          </aside>

          <main className="col-span-12 md:col-span-9">
            <DocumentTable
              items={state.filtered}
              query={state.query}
              onQueryChange={actions.setQuery}
              onUploadClick={actions.onPickFileClick}
              onDocSelectClick={handleDocSelect}
              loading={state.loading}
            />
          </main>
          {/* confirm delete modal */}
          {selectedDoc != null && selectedDoc.purpose == "Delete" && (
            <ConfirmDeleteModal
              onCancel={handleClose}
              onConfirm={handleConfirm}
            />
          )}
          {/* view pii list modal */}
          {selectedDoc != null && selectedDoc.purpose == "View" && (
            <PiiListModal piiList={piiList} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
}
