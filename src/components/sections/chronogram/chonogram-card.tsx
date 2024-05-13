import { ChonogramI } from "@/consts/chonogram";
import { cn } from "@/lib/cn";
import React from "react";

interface ChonogramCardProps {
  card: ChonogramI;
}

const POSITIONS = {
  1: "top-0",
  2: "bottom-56  lg:bottom-80 2xl:bottom-96 ",
  3: "bottom-0 lg:bottom-[6.5rem] ",
};

export default function ChonogramCard({ card }: ChonogramCardProps) {
  const zIndex = card.id * 10;

  const position = POSITIONS[card.id];

  return (
    <article
      className={cn(
        "absolute left-0 h-72  w-full overflow-hidden rounded-tl-[3rem]  rounded-tr-[3rem] border-t-4 bg-secondary px-12 pt-12 text-white shadow-2xl lg:h-80 2xl:h-[24rem]",
        `${position}`,
        `z-${zIndex}`,
      )}
    >
      <section className="mb-6 flex w-full flex-col justify-between lg:flex-row lg:items-center">
        <h3 className="lg:3xl w-72 text-3xl font-bold uppercase  italic 2xl:text-4xl">
          {card.date}
        </h3>
        <div className="lg:2xl text-2xl font-medium 2xl:text-3xl">
          <p>{card.to}</p>
          <p className="lg:text-end">{card.to2}</p>
        </div>
      </section>
      <div className="h-0.5 w-full rounded-full bg-white"></div>
    </article>
  );
}
