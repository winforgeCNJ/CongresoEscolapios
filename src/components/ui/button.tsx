import { cn } from "@/lib/cn";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  to?: string;
}

export default function Button({
  children,
  className,
  to,
  onClick,
}: ButtonProps) {
  const classDefault =
    "text-primary to-secondary shadow-secondary/15 inline-block rounded-full bg-gradient-to-r from-white via-white px-8 py-2 tracking-wide shadow-lg transition-all hover:scale-[1.04] hover:tracking-widest";

  if (!to)
    return (
      <button onClick={onClick} className={cn(classDefault, className)}>
        {children}
      </button>
    );

  return (
    <Link href={to} className={cn(classDefault, className)}>
      {children}
    </Link>
  );
}
