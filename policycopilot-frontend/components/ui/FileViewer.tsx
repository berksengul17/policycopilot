"use client";

import { useEffect, useRef, useState } from "react";
import DocViewer from "react-doc-viewer";

export default function FileViewer({ content }: { content: Blob }) {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const url = URL.createObjectURL(content);

      setDocs([
        {
          uri: url,
          fileName: "doc",
        },
      ]);

      return () => URL.revokeObjectURL(url);
    };
    run();
  }, [content]);

  if (!docs.length) return <div>Loading…</div>;

  return <DocViewer documents={docs} />;
}
