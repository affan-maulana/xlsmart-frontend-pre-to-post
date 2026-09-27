import { ChevronDown, ChevronRight } from 'lucide-react';

interface LinkActionProps {
  label: string;
  variant?: 'chevron-right' | 'chevron-down' | 'plain';
  onClick?: () => void;
  className?: string;
}

/** Small brand-colored text action, optionally with a trailing chevron. */
export function LinkAction({ label, variant = 'plain', onClick, className = '' }: LinkActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-sm font-semibold text-brand-link hover:text-brand-indigo transition-colors ${className}`}
    >
      {label}
      {variant === 'chevron-right' && <ChevronRight size={16} />}
      {variant === 'chevron-down' && <ChevronDown size={16} />}
    </button>
  );
}
