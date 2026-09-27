import { ChevronLeft } from 'lucide-react';

interface BreadcrumbProps {
  trail: string[];
}

export function Breadcrumb({ trail }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-black/80">
      <ChevronLeft size={16} />
      {trail.map((item, index) => (
        <span key={item} className="flex items-center gap-2">
          {index === trail.length - 1 ? (
            <span className="font-semibold text-black">{item}</span>
          ) : (
            <span>{item}</span>
          )}
          {index < trail.length - 1 && <span className="text-gray-400">/</span>}
        </span>
      ))}
    </div>
  );
}
