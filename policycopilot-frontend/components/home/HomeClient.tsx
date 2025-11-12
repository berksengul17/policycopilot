"use client";

import { useEffect, useState } from "react";
import { useDocuments } from "@/hooks/useDocuments";
import Sidebar from "./Sidebar";
import DocumentTable from "./DocumentTable";
import ConfirmDeleteModal from "./ConfirmDeleteModel";
import FileViewer from "../ui/FileViewer";
import { SelectedDoc } from "@/types/document";

export default function HomeClient() {
  const { state, actions, refs } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState<SelectedDoc | null>(null);
  const [selectedDocContent, setSelectedDocContent] = useState<Blob | null>(
    null
  );

  const handleDocSelect = (selectedDoc: SelectedDoc) => {
    setSelectedDoc(selectedDoc);
  };

  const handleCancel = () => setSelectedDoc(null);

  const handleConfirm = async () => {
    if (selectedDoc == null || selectedDoc?.purpose != "Delete") return;
    actions.remove(selectedDoc.docId);
    setSelectedDoc(null);
  };

  const handleLoadContent = async () => {
    if (selectedDoc != null && selectedDoc.purpose == "View") {
      const data = await actions.loadContent(selectedDoc.docId);
      setSelectedDocContent(data);
    }
  };

  useEffect(() => {
    actions.load();
  }, [actions.load]);

  useEffect(() => {
    console.log("selected doc changed");
    handleLoadContent();
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
            {selectedDoc != null &&
              selectedDocContent &&
              selectedDoc.purpose == "View" && (
                <FileViewer content={selectedDocContent} />
              )}
          </main>
          {/* modal */}
          {selectedDoc != null && selectedDoc.purpose == "Delete" && (
            <ConfirmDeleteModal
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}
