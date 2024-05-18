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
  1: "min-h-[calc(100vh-5rem)]",
  2: "min-h-[calc(100vh-5rem)]",
  3: "min-h-[calc(100vh-5rem)]",
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
  isOpen,
  active,
}: ChonogramCardProps) {
  const zIndex = onIndex(card.id);
  const height = HEIGHT_NULL[card.id];

  const top = calculateTop(active, card.id);

  const innerHeight = "calc(${TOTAL_HEIGHT} - 3 * ${OFFSET_HEIGHT})";

  return (
    <article
      onClick={onOpen}
      className={cn(
        " ",
        `z-${zIndex} -w-full relative cursor-pointer rounded-[2rem] transition-all duration-300 hover:mb-4 `,
        `${height}`,
      )}
      style={{ top: top }}
    >
      <div
        className={cn(
          "container w-full cursor-pointer rounded-[2rem] border-4 border-primary bg-primary bg-gradient-to-b from-white/40  via-white/40 to-secondary px-8  pt-4 text-white shadow-2xl transition-all  duration-300  hover:mb-4  lg:pb-4 2xl:pb-0",
          `${height}`,
        )}
      >
        <section className="relative flex w-full flex-col items-start justify-between border-b-2 pb-2">
          <h3 className=" w-4/4 text-base font-bold uppercase  ">
            {card.date}
          </h3>
          <div className="flex w-full justify-between text-xs font-medium">
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
        <div
          className={
            "mt-4 flex h-full flex-col gap-4 overflow-auto lg:flex-row"
          }
          style={{
            height: isOpen
              ? "calc(100vh - 5rem - 85px - 85px - 85px)"
              : undefined,
          }}
        >
          <div className="w-full lg:w-1/2">
            <h4 className="mb-1 text-xl font-bold uppercase">
              {card.morningDescription.title}
            </h4>
            <ul>
              {card.morningDescription.coursesHours.map((el) => (
                <li className={"text-base"}>{el}</li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <h4 className="mb-1 text-xl font-bold uppercase">
              {card.afternoonDescription?.title}
            </h4>
            <ul>
              {card.afternoonDescription?.coursesHours.map((el) => (
                <li className={"text-base"}>{el}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
