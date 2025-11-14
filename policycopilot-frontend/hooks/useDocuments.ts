import {
  deleteDocument,
  fetchDocuments,
  fetchPiiList,
  uploadDocument,
} from "@/services/docService";
import { PIIEntity } from "@/types/pii";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";

export function useDocuments() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");

  const { data: docs = [], isLoading: loading } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
    // only refetch if there are queued documents
    refetchInterval: (query) => {
      const data = query.state.data;
      const hasPending = data?.some((d) => d.status == "QUEUED");
      return hasPending ? 2500 : false;
    },
    refetchOnWindowFocus: true,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });

  const loadPiiList = useCallback(
    (docId: string): Promise<PIIEntity[]> => fetchPiiList(docId),
    []
  );

  const remove = useCallback((docId: string) => {
    deleteMutation.mutate(docId);
  }, []);

  const onPickFileClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    uploadMutation.mutate(f);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }, []);

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
    () => docs.filter((d) => d.status === "QUEUED").length,
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
    actions: {
      setQuery,
      loadPiiList,
      remove,
      onPickFileClick,
      onFileChange,
    },
    refs: { fileRef },
  };
}
