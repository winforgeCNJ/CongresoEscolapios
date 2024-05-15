"use client";

import { chonogram } from "@/consts/chonogram";
import ChonogramCard from "./chonogram-card";
import Title from "@/components/ui/title";
import React, { useState } from "react";

export default function Chronogram() {
  const [chonogramSelect, setChonogramSelect] = useState<number | null>(1);

  const onOpen = (id: number) => {
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
        <Title title="Cronograma" className="pl-28" />
        <div className="relative mt-4  flex min-h-screen  w-full flex-col overflow-hidden lg:h-[calc(100vh-7rem)]">
          {chonogram.map((item) => (
            <ChonogramCard
              key={item.id}
              card={item}
              isOpen={chonogramSelect === item.id}
              onOpen={() => onOpen(item.id)}
            />
          ))}
        </div>
      </section>
      <div className="h-screen w-full flex-1">
        <img
          src="/assets/chonogram/chonogram-image.webp"
          className="h-screen w-full object-cover"
        />
      </div>
    </section>
  );
}
