"use client";

import { useEffect } from "react";
import { useDocuments } from "@/hooks/useDocuments";
import Sidebar from "./Sidebar";
import DocumentTable from "./DocumentTable";

export default function HomeClient() {
  const { state, actions, refs } = useDocuments();

  useEffect(() => {
    actions.load();
  }, [actions.load]);

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
              loading={state.loading}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
