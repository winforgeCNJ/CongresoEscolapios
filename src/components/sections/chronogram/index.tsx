import { chonogram } from "@/consts/chonogram";
import ChonogramCard from "./chonogram-card";
import Title from "@/components/ui/title";
import React from "react";

export default function Chronogram() {
  return (
    <section className="flex flex-col bg-primary lg:h-screen  lg:flex-row ">
      <section className="flex-1 pt-12">
        <Title title="Cronograma" className="pl-28" />
        <div className="relative mt-4  flex min-h-screen  w-full flex-col overflow-hidden lg:h-[calc(100vh-7rem)]">
          {chonogram.map((item) => (
            <ChonogramCard card={item} />
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
