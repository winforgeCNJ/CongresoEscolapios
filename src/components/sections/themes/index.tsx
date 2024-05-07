import Title from "@/components/ui/title";
import { themes } from "@/consts/themes";
import ThemeCard from "./theme-card";
import React from "react";

export default function Themes() {
  return (
    <section
      id="tematicas"
      className="relative grid min-h-screen grid-cols-1 lg:grid-cols-3"
    >
      <div className="absolute left-12 top-12 z-20 2xl:left-28">
        <Title title="Temáticas a" active="desarrollar" />
      </div>
      {themes.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} />
      ))}
    </section>
  );
}
