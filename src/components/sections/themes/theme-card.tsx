"use client";

import IconChevronDown from "@/components/icons/icon-chevron-down";
import { Alegreya } from "next/font/google";
import Button from "@/components/ui/button";
import DropdownCard from "./dropdown-card";
import React, { useState } from "react";

export const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["500"],
});

interface ThemeCardProps {
  theme: {
    id: number;
    description: string;
    image: string;
    list: string[];
  };
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  return (
    <article className="relative h-screen w-full">
      <img src={theme.image} alt="image" className="h-full w-full" />
      <div className="absolute left-1/2 top-1/2 flex h-72 w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-3 rounded-3xl bg-primary/40 px-4 text-white lg:w-96">
        <p
          className={`${alegreya.className} mb-4 text-center text-2xl font-medium lg:text-3xl`}
        >
          {theme.description}
        </p>
        <Button onClick={onOpen} className="px-12 py-1">
          <IconChevronDown />
        </Button>
      </div>

      <DropdownCard isOpen={open} title={theme.description} list={theme.list} />
    </article>
  );
}
