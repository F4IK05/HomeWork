import { ChevronRight } from "lucide-react";

export const ActionButton = ({
  icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
        transition bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm
        ${variant === "danger" ? "text-red-400 hover:text-red-300" : "text-white"}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 opacity-70" />
    </button>
  );
};