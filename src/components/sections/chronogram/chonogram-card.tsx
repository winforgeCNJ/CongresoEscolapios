import IconPin from "@/components/icons/icon-pin";
import { ChonogramI } from "@/consts/chonogram";
import { optionsChonogram } from ".";
import { cn } from "@/lib/cn";
import React from "react";

interface ChonogramCardProps {
  card: ChonogramI;
  onOpen: () => void;
  isOpen: boolean;
  active: optionsChonogram;
}

const HEIGHT_NULL = {
  1: "min-h-[50vh] lg:min-h-[calc(100vh-5rem)]",
  2: "min-h-[50vh] lg:min-h-[calc(100vh-5rem)]",
  3: "min-h-[50vh] lg:min-h-[calc(100vh-5rem)]",
};

const TOTAL_HEIGHT = "100vh - 5rem";
const OFFSET_HEIGHT = "80px";

const calculateTop = (active: optionsChonogram, cardId: optionsChonogram) => {
  if (active === 3)
    return cardId === 3
      ? `calc(-1 * (2 * (${TOTAL_HEIGHT}) - 2 * ${OFFSET_HEIGHT}))`
      : cardId === 2
        ? `calc(-1 * (${TOTAL_HEIGHT} - ${OFFSET_HEIGHT}))`
        : undefined;

  if (active === 2)
    return cardId === 3
      ? `calc(-1 * (${TOTAL_HEIGHT} + ${OFFSET_HEIGHT}))`
      : cardId === 2
        ? `calc(-1 * (${TOTAL_HEIGHT} - ${OFFSET_HEIGHT}))`
        : undefined;
  if (active === 1)
    return cardId === 3
      ? `calc(-1 * (${TOTAL_HEIGHT} + ${OFFSET_HEIGHT}))`
      : cardId === 2
        ? `calc(-2 * ${OFFSET_HEIGHT})`
        : undefined;
};

const onIndex = (id: optionsChonogram) => id * 10;
export default function ChonogramCard({
  card,
  onOpen,
  active,
}: ChonogramCardProps) {
  const zIndex = onIndex(card.id);
  const height = HEIGHT_NULL[card.id];

  const top = calculateTop(active, card.id);

  return (
    <article
      onClick={onOpen}
      className={cn(
        " ",
        `z-${zIndex} -w-full relative cursor-pointer transition-all duration-300 hover:mb-4`,
        `${height}`,
      )}
      style={{ top: top }}
    >
      <div
        className={cn(
          "border-primary-2  w-full cursor-pointer rounded-t-[2rem] border-4 border-primary bg-primary bg-gradient-to-b from-white/40 via-white/40  to-secondary px-12 pt-4  text-white shadow-2xl transition-all duration-300  hover:mb-4  lg:pb-4  2xl:pb-0",
          `${height}`,
        )}
      >
        <section className="relative mb-2 flex w-full flex-col justify-between px-4 lg:flex-row lg:items-center">
          <h3 className=" w-4/4 text-xl font-bold uppercase  ">{card.date}</h3>
          <div className=" text-sm font-medium">
            <p>{card.to}</p>
            <p className="lg:text-end">{card.to2}</p>
          </div>
          <span
            className={cn(
              "pointer-events-none absolute -right-8 -top-0 opacity-0 transition-opacity ",
            )}
          >
            <IconPin />
          </span>
        </section>
        <div className="mb-4 h-0.5 w-full rounded-full bg-white"></div>
        <div
          className={cn(
            "duration-400 pointer-events-none absolute translate-y-2 opacity-0 transition-all ease-in-out",
            "pointer-events-auto static translate-y-0 opacity-100",
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
