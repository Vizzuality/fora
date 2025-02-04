// components/ui/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function ProjectCard({ title, children }: CardProps) {
  return (
    <div className="p-6 space-y-6 bg-white border-2 shadow-lg border-white/95 rounded-xl ">
      {title && <h2 className="mb-4 font-sans text-[2rem] font-semibold text-gray-900">{title}</h2>}
      <div>{children}</div>
    </div>
  );
}
