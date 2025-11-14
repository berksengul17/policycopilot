import { PIIEntity } from "@/types/pii";
import { useRef, useState } from "react";

export default function PiiListModal({
  piiList,
  onClose,
}: {
  piiList: PIIEntity[];
  onClose: () => void;
}) {
  const [onlyHighRisk, setOnlyHighRisk] = useState<boolean>(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const copyOne = async (s: string) => {
    await navigator.clipboard.writeText(s);
  };

  const copyAll = async () => {
    if (!piiList.length) return;
    await navigator.clipboard.writeText(piiList.join("\n"));
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={onBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="PII list"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-white/60 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Detected PII
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {`${piiList?.length ?? 0} shown`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={onlyHighRisk}
              onChange={(e) => setOnlyHighRisk(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            High-risk only
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within PII strings…"
            className="w-full sm:w-72 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={copyAll}
              disabled={!piiList.length}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              title="Copy all"
            >
              Copy all
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-4 max-h-[60vh] overflow-auto rounded-xl border border-gray-100">
          {!piiList.length ? (
            <div className="p-6 text-center text-gray-500">
              No PII detected.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {piiList.map((p, i) => (
                <li
                  key={p.id ?? `${i}-${p.type}-${p.text.slice(0, 8)}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                    {i + 1}
                  </span>

                  {/* Type + risk badges */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                      {p.type}
                    </span>
                    {p.isHighRisk ? (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                        High
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Normal
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  <span
                    className="min-w-0 flex-1 truncate text-sm text-gray-800"
                    title={p.text}
                  >
                    {p.text}
                  </span>

                  <button
                    onClick={() => copyOne(p.text)}
                    className="shrink-0 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
