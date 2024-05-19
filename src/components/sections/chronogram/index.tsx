"use client";

import { chonogram } from "@/consts/chonogram";
import ChonogramCard from "./chonogram-card";
import Title from "@/components/ui/title";
import React, { useState } from "react";

export type optionsChonogram = 1 | 2 | 3;

export default function Chronogram() {
  const [chonogramSelect, setChonogramSelect] = useState<optionsChonogram>(3);

  const onOpen = (id: optionsChonogram) => {
    setChonogramSelect((prevId) => (prevId === id ? 3 : id));
  };

  return (
    <section
      id="cronograma"
      className="flex flex-col bg-primary h-auto lg:h-screen  lg:flex-row "
    >
      <section className="flex-1">
        <Title
          title="Cronograma"
          className="flex h-[5rem] items-center pl-12"
        />
        <div className="relative basis-8/12 flex flex-col w-full overflow-hidden h-[100dvh]  lg:h-[calc(100vh-5rem)] ">
          {chonogram.map((item) => (
            <ChonogramCard
              key={item.id}
              card={item}
              active={chonogramSelect}
              isOpen={chonogramSelect === item.id}
              onOpen={() => onOpen(item.id)}
            />
          ))}
        </div>
      </section>
      <div className="h-screen basis-1/2  hidden lg:block">
        <img
          src={chonogram[chonogramSelect - 1]?.hostImg}
          className="h-screen w-full "
        />
      </div>
    </section>
  );
}
