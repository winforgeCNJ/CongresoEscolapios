import { menu } from "@/consts/menu";
import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <nav className="">
      <ul className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
        {menu.map((nav) => (
          <li key={nav.id} className=" ">
            <Link
              href={nav.to}
              className="py-6 text-2xl font-medium transition-colors hover:text-secondary lg:text-base lg:font-semibold "
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
