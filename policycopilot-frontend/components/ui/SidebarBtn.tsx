export default function SidebarBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left rounded-xl px-3 py-2.5 transition",
        active
          ? "bg-gradient-to-r from-teal-400 to-violet-500 text-white shadow"
          : "hover:bg-gray-50 text-gray-700 border border-gray-200",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
