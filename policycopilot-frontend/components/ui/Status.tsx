export default function Status({
  title,
  value,
  highlight,
}: {
  title: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl p-3 border text-center",
        highlight
          ? "border-rose-200 bg-rose-50/60 text-rose-700"
          : "border-gray-200 bg-white/70 text-gray-700",
      ].join(" ")}
    >
      <div className="text-xs">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
