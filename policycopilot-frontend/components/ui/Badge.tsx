export default function Badge({
  children,
  tone = "stone",
}: {
  children: React.ReactNode;
  tone?: "stone" | "violet" | "emerald" | "amber" | "rose";
}) {
  const styles: Record<string, string> = {
    stone: "bg-gray-100 text-gray-700",
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-800",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
