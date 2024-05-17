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
        "slide-in  flex h-[16.8rem] w-full flex-col items-center justify-center px-6 text-white  transition-all  duration-500 lg:w-[40vw] lg:px-0",
        objectiveActive === card.id ? "opacity-100" : "-z-10 opacity-0",
      )}
    >
      <img src={card.icon} width={150} height={150} className="" />
      <p className="w-full text-center text-xl lg:w-[18rem] lg:text-lg  ">
        {card.description}
      </p>
    </article>
  );
}
