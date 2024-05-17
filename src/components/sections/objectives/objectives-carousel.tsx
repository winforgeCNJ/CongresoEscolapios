"use client";

import { objectives } from "@/consts/objectives";
import ObjectiveCard from "./objective-card";
import React, { useState } from "react";

export default function ObjectivesCarousel() {
  const [objectiveActive, setObjectiveActive] = useState(objectives[0].id);

  const onDot = (item: number) => {
    setObjectiveActive(item);
  };

  return (
    <section className="flex h-screen  w-auto flex-col items-center justify-center gap-y-2 bg-primary">
      {objectives.map((objective) => (
        <ObjectiveCard
          objectiveActive={objectiveActive}
          key={objective.id}
          card={objective}
        />
      ))}

      <section className="flex items-center gap-x-2 ">
        {objectives.map((item) => (
          <button
            key={item.id}
            className={`h-2 w-2 cursor-pointer rounded-full bg-gray-300 p-1 ease-in-out hover:bg-white hover:p-1.5 hover:duration-[300ms] ${
              objectiveActive === item.id
                ? " bg-white p-1.5 duration-[400ms] ease-in-out"
                : ""
            }`}
            onClick={() => onDot(item.id)}
          ></button>
        ))}
      </section>
    </section>
  );
}
