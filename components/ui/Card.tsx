import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

/** Base white rounded card shell reused across the profile page. */
export function Card({ children, className = "", padded = true }: CardProps) {
  return (
    <div
      className={`rounded-card bg-white shadow-card ${
        padded ? "p-5 sm:p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
