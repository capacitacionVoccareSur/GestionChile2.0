import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  );
}
