import IconPin from "@/components/icons/icon-pin";
import { ChonogramI } from "@/consts/chonogram";
import { cn } from "@/lib/cn";
import React from "react";

interface ChonogramCardProps {
  card: ChonogramI;
  onOpen: () => void;
  isOpen: boolean;
}

const POSITIONS = {
  1: "top-0",
  2: "bottom-56  lg:bottom-80 2xl:bottom-96 ",
  3: "bottom-0 lg:bottom-[6.5rem] ",
};

export default function ChonogramCard({
  card,
  isOpen,
  onOpen,
}: ChonogramCardProps) {
  const zIndex = isOpen ? 50 : card.id * 10;

  const position = POSITIONS[card.id];

  return (
    <article
      onClick={onOpen}
      className={cn(
        "absolute left-0 min-h-72 w-full  cursor-pointer overflow-hidden rounded-tl-[3rem]  rounded-tr-[3rem] border-t-4 bg-secondary px-12 pt-12 text-white shadow-2xl transition-all duration-300  hover:-translate-y-2 lg:min-h-80 lg:pb-4 2xl:min-h-[24rem] 2xl:pb-0",
        `${position}`,
        `z-${zIndex}`,
        isOpen &&
          `rounded-[3rem] border-4 hover:-translate-y-0  
          ${card.id === 1 ? "top-0" : card.id === 2 ? "bottom-auto top-0 lg:bottom-80 lg:top-auto 2xl:bottom-96" : "bottom-auto top-0 lg:bottom-[6.5rem] lg:top-auto"}
        `,
      )}
    >
      <section className="relative mb-6 flex w-full flex-col justify-between lg:flex-row lg:items-center">
        <h3 className="lg:3xl w-72 text-3xl font-bold uppercase  italic 2xl:text-4xl">
          {card.date}
        </h3>
        <div className="lg:2xl text-2xl font-medium 2xl:text-3xl">
          <p>{card.to}</p>
          <p className="lg:text-end">{card.to2}</p>
        </div>
        <span
          className={cn(
            "pointer-events-none absolute -right-8 -top-6 opacity-0 transition-opacity ",
            isOpen && "pointer-events-auto opacity-100",
          )}
        >
          <IconPin />
        </span>
      </section>
      <div className="mb-4 h-0.5 w-full rounded-full bg-white"></div>
      <div
        className={cn(
          "duration-400 pointer-events-none absolute translate-y-2 opacity-0 transition-all ease-in-out",
          isOpen && "pointer-events-auto static translate-y-0 opacity-100",
        )}
      >
        <h4 className="mb-1 text-xl font-medium lg:text-2xl">
          Presentaciones y talleres dicatados por:
        </h4>
        <p className="lg:text-base 2xl:text-lg ">{card.description}</p>
      </div>
    </article>
  );
}
