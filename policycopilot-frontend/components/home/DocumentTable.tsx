"use client";

import Badge from "@/components/ui/Badge";
import type { Doc } from "@/types/document";

export default function DocumentTable({
  items,
  query,
  onQueryChange,
  onUploadClick,
  onDeleteClick,
  loading,
}: {
  items: Doc[];
  query: string;
  onQueryChange: (v: string) => void;
  onUploadClick: () => void;
  onDeleteClick: (docId: string) => void;
  loading?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-white/50">
      <div className="px-6 py-5 border-b border-gray-100/70 flex items-center gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Documents
        </h1>
        <span className="ml-auto" />
        <div className="relative w-full max-w-xs">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search documents…"
            className="w-full rounded-xl border border-gray-300 bg-white/70 pl-4 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none ring-0 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        <button
          onClick={onUploadClick}
          className="rounded-xl bg-gradient-to-r from-teal-400 to-violet-500 text-white px-4 py-2.5 font-medium shadow-md hover:opacity-95 active:scale-[.99] transition"
        >
          Upload
        </button>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <Th>Name</Th>
                <Th>Uploaded</Th>
                <Th>PII</Th>
                <Th>High-Risk</Th>
                <Th>Status</Th>
                <Th className="text-center">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((d) => (
                <tr key={d.id} className="hover:bg-white/60">
                  <Td>
                    <span className="font-medium text-gray-900">{d.name}</span>
                  </Td>
                  <Td>{new Date(d.uploadDate).toLocaleDateString()}</Td>
                  <Td>
                    <Badge tone={d.piiCount ? "violet" : "stone"}>
                      {d.piiCount}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge tone={d.highRiskCount ? "rose" : "stone"}>
                      {d.highRiskCount}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      tone={
                        d.status === "SCANNED"
                          ? "emerald"
                          : d.status === "QUEUED"
                          ? "amber"
                          : d.status === "SCANNING"
                          ? "violet"
                          : "rose"
                      }
                    >
                      {d.status}
                    </Badge>
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-100">
                        View
                      </button>
                      <button
                        onClick={() => onDeleteClick(d.id)}
                        className="ml-2 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50 text-gray-800 hover:text-red-500 "
                      >
                        {/* Delete icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          className="w-4 h-4"
                          fill="currentColor"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="text-center text-gray-500 py-10">Loading…</div>
          )}
          {!loading && items.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No documents found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <th className={`py-3 pr-4 ${className}`}>{children}</th>;
}
function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`py-3 pr-4 text-gray-800 ${className}`}>{children}</td>;
}
