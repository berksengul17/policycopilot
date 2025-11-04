import { useCallback, useMemo, useRef, useState } from "react";
import type { Doc } from "@/types/document";
import { fetchDocuments, uploadDocument } from "@/services/docService";

export function useDocuments() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDocuments();
      setDocs(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const onPickFileClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const created = await uploadDocument(f);
      setDocs((prev) => [created, ...prev]);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    },
    []
  );

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    return t ? docs.filter((d) => d.name.toLowerCase().includes(t)) : docs;
  }, [docs, query]);

  const totalPII = useMemo(
    () => docs.reduce((s, d) => s + d.piiCount, 0),
    [docs]
  );
  const totalHighRisk = useMemo(
    () => docs.reduce((s, d) => s + d.highRiskCount, 0),
    [docs]
  );
  const queuedCount = useMemo(
    () => docs.filter((d) => d.status === "Queued").length,
    [docs]
  );

  return {
    state: {
      docs,
      filtered,
      query,
      loading,
      totalPII,
      totalHighRisk,
      queuedCount,
    },
    actions: { setQuery, load, onPickFileClick, onFileChange },
    refs: { fileRef },
  };
}
