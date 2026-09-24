import { AlertCircle } from "lucide-react";

interface AlertRowProps {
  message: string;
  actionLabel: string;
  variant?: "onWhite" | "warnBanner";
}

/** Generic dismiss-free notice row with a trailing text action, in two color variants. */
export function AlertRow({
  message,
  actionLabel,
  variant = "onWhite",
}: AlertRowProps) {
  if (variant === "warnBanner") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-card bg-status-warnBg px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-status-warn text-white">
            <AlertCircle size={14} />
          </span>
          <p className="text-sm font-medium text-ink-900">{message}</p>
        </div>
        <button type="button" className="whitespace-nowrap text-sm font-semibold text-brand-link">
          {actionLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-card bg-white px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white">
          <AlertCircle size={14} />
        </span>
        <p className="text-sm text-ink-900">{message}</p>
      </div>
      <button type="button" className="whitespace-nowrap text-sm font-semibold text-brand-link">
        {actionLabel}
      </button>
    </div>
  );
}
