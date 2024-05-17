import { Alegreya } from "next/font/google";
import React from "react";

export const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["500"],
});

interface DropdownCardProps {
  list: string[];
  title: string;
  isOpen: boolean;
}

export default function DropdownCard({
  list,
  title,
  isOpen,
}: DropdownCardProps) {
  return (
    <section
      className={`${isOpen ? "z-40 opacity-100" : " pointer-events-none opacity-0"} absolute left-0 top-0 flex h-full w-full flex-col gap-y-4  bg-box-dropdown px-4 py-12 transition-opacity lg:gap-y-6 2xl:gap-y-12`}
    >
      <h3
        className={`${alegreya.className} mx-auto w-56 text-center text-lg font-medium text-white lg:text-lg 2xl:w-72 2xl:text-3xl`}
      >
        {title}
      </h3>
      <ol className="flex flex-col gap-y-4 text-white lg:gap-y-3 2xl:gap-y-6 2xl:pl-6">
        {list.map((item, index) => (
          <li key={item} className="text-sm  2xl:text-xl">
            <span className="marker italic">
              {String.fromCharCode(97 + index)}.
            </span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
