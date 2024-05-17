"use client";

import { chonogram } from "@/consts/chonogram";
import ChonogramCard from "./chonogram-card";
import Title from "@/components/ui/title";
import React, { useState } from "react";

export type optionsChonogram = 1 | 2 | 3;

export default function Chronogram() {
  const [chonogramSelect, setChonogramSelect] =
    useState<optionsChonogram | null>(null);

  const onOpen = (id: optionsChonogram) => {
    if (!chonogramSelect)
      setChonogramSelect(id === chonogramSelect ? null : id);
    else setChonogramSelect(null);
  };

  return (
    <section
      id="cronograma"
      className="flex flex-col bg-primary lg:h-screen  lg:flex-row "
    >
      <section className="flex-1 pt-12">
        <Title title="Cronograma" className="pl-12" />
        <div className="relative flex flex-col overflow-hidden  lg:h-[calc(100vh-5rem)]">
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
      <div className="h-screen w-full flex-1">
        <img
          src="/assets/chonogram/chonogram-image.webp"
          className="h-screen w-full "
        />
      </div>
    </section>
  );
}
