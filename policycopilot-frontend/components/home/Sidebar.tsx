"use client";

import SidebarBtn from "@/components/ui/SidebarBtn";
import Status from "@/components/ui/Status";

export default function Sidebar({
  userName,
  stats,
  onUploadClick,
  fileInput,
  onFileChange,
}: {
  userName: string;
  stats: { docs: number; pii: number; high: number; queued: number };
  onUploadClick: () => void;
  fileInput: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-white/50 p-6">
      {/* user */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-violet-500 flex items-center justify-center text-white font-semibold">
          {userName?.[0] ?? "U"}
        </div>
        <div>
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-semibold text-gray-900">{userName}</p>
        </div>
      </div>

      {/* nav */}
      <div className="mt-8 space-y-2">
        <SidebarBtn label="Uploaded Documents" active />
        <SidebarBtn label="Upload New" onClick={onUploadClick} />
        <SidebarBtn label="Scan Queue" />
      </div>

      {/* stats */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Status title="Documents" value={stats.docs} />
        <Status title="PII Found" value={stats.pii} />
        <Status title="High-Risk" value={stats.high} highlight />
        <Status title="Queued" value={stats.queued} />
      </div>

      {/* hidden input */}
      <input
        ref={fileInput}
        type="file"
        accept=".pdf,.doc,.docx,.csv"
        className="hidden"
        onChange={onFileChange}
      />

      <button
        className="mt-8 w-full rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
        onClick={() => {}}
      >
        Logout
      </button>
    </div>
  );
}
