import { cn } from "@/lib/cn";
import React from "react";

interface ObjectiveCardProps {
  card: {
    icon: string;
    description: string;
    id: number;
  };
  objectiveActive: number;
}

export default function ObjectiveCard({
  card,
  objectiveActive,
}: ObjectiveCardProps) {
  if (objectiveActive !== card.id) return null;

  return (
    <article
      className={cn(
        "slide-in  flex h-[26rem] w-full flex-col items-center justify-center gap-y-4 px-6 text-white  transition-all  duration-500 lg:w-[40vw] lg:px-0",
        objectiveActive === card.id ? "opacity-100" : "-z-10 opacity-0",
      )}
    >
      <img src={card.icon} width={250} height={250} />
      <p className="w-full text-center text-xl lg:w-[28rem] lg:text-2xl 2xl:w-[30.4rem] 2xl:text-3xl">
        {card.description}
      </p>
    </article>
  );
}
