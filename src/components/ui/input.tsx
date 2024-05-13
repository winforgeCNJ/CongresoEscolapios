import { cn } from "@/lib/cn";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-[1.5rem] border-2 bg-transparent px-6 py-4 text-lg text-white outline-none focus:border-4 focus:border-secondary",
        className,
      )}
      {...rest}
    />
  );
}
