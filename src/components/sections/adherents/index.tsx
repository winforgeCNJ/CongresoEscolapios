"use client";
import Title from "@/components/ui/title";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar los módulos necesarios
import { Navigation, Pagination } from "swiper/modules";
import { Container } from "@mui/material";
import { adherents } from "@/consts/adherents";

export default function Adherents() {
  return (
    <section
      id="nos-acompañan"
      className="flex h-auto flex-col bg-primary lg:h-screen lg:flex-row"
    >
      {/* <Title title="Adherentes" className="flex h-[5rem] items-center pl-12" /> */}

      <section className="flex w-full flex-1 flex-col items-center">
        <div className="flex h-[5rem] w-full items-center justify-start pl-12">
          <Title title="Ya nos" active="Acompañan" />
        </div>
        <section className="grid w-[90%] flex-grow place-items-center">
          <Swiper
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
            className="mySwiper h-[500px] w-full sm:h-[400px] md:h-[300px]"
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            loop={true}
          >
            {adherents.map((el, index) => (
              <SwiperSlide key={el.id}>
                <div
                  className={`flex flex-col gap-4 ${el.url === "" && "h-[68.5%] justify-end md:h-[80%]"}`}
                >
                  <img src={el.url} />
                  <div className="h-[50px] text-center font-semibold text-white lg:text-base">
                    {el.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </section>
    </section>
  );
}
