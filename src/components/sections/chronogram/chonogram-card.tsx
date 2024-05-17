import IconPin from "@/components/icons/icon-pin";
import { ChonogramI } from "@/consts/chonogram";
import { optionsChonogram } from ".";
import { cn } from "@/lib/cn";
import React from "react";

interface ChonogramCardProps {
  card: ChonogramI;
  onOpen: () => void;
  isOpen: boolean;
  active: optionsChonogram | null;
}

const HEIGHT_MIDDLE = {
  1: "h-24 -mb-8",
  2: "h-[88vh] lg:h-[78.8vh] ",
  3: "h-24 -mt-8",
};

const HEIGHT_FIRST = {
  1: "h-[88vh] lg:h-[78.8vh]  z-30",
  2: "h-24 -mt-8 z-40",
  3: "h-24 -mt-8 z-20",
};

const HEIGHT_LAST = {
  1: "h-24 -mb-8 ",
  2: "h-24 -mb-8",
  3: "h-[88vh] lg:h-[78.8vh] ",
};

const HEIGHT_NULL = {
  1: "min-h-[50vh] lg:min-h-[40.2vh] lg:pb-4 ",
  2: "min-h-[50vh] lg:min-h-[40.2vh] lg:pb-4 -mt-40",
  3: "min-h-[50vh] lg:min-h-[40.2vh] lg:pb-4 -mt-20",
};

const onHeight = (active: optionsChonogram) => {
  const optionsHeight = {
    1: HEIGHT_FIRST,
    2: HEIGHT_MIDDLE,
    3: HEIGHT_LAST,
  };

  return optionsHeight[active];
};

const onIndex = (active: optionsChonogram | null, id: optionsChonogram) => {
  if (active === 1 && id === 2) return 40;
  if (active === id) return 50;

  return id * 10;
};

export default function ChonogramCard({
  card,
  isOpen,
  onOpen,
  active,
}: ChonogramCardProps) {
  const zIndex = onIndex(active, card.id);

  const height = !active ? HEIGHT_NULL[card.id] : onHeight(active)[card.id];

  return (
    <article onClick={onOpen} className={cn(" ", `z-${zIndex}`)}>
      <div
        className={cn(
          "border-primary-2 w-full cursor-pointer overflow-hidden rounded-tl-[3rem] rounded-tr-[3rem]  border-4 border-primary bg-primary bg-gradient-to-r from-white/40 via-white/40  to-secondary px-12 pt-12  text-white shadow-2xl transition-all duration-300  hover:-translate-y-2  lg:pb-4  2xl:pb-0",
          `${height}`,
        )}
      >
        <section className="relative mb-6 flex w-full flex-col justify-between lg:flex-row lg:items-center">
          <h3 className=" w-56 text-xl font-bold uppercase  italic ">
            {card.date}
          </h3>
          <div className=" text-lg font-medium">
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
          <h4 className="mb-1  font-medium ">
            Presentaciones y talleres dicatados por:
          </h4>
          <p className="l ">{card.description}</p>
        </div>
      </div>
    </article>
  );
}
