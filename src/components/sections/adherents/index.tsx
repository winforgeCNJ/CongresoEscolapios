"use client";
import Title from "@/components/ui/title";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import './adherents.styles.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar los módulos necesarios
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { adherents } from "@/consts/adherents";
import IconChevronRight from "@/components/icons/icon-chevron-right";
import IconChevronLeft from "@/components/icons/icon-chevron-left";

export default function Adherents() {
  return (
    <section
      id="nos-acompañan"
      className="flex flex-col bg-primary h-screen lg:flex-row"
    >
      <section className="flex w-full flex-1 flex-col items-center">
        <div className="flex w-full items-center justify-start 2xl:pl-28 pl-6  lg:pl-12 pt-12">
          <Title title="Ya nos" active="Acompañan" />
        </div>
        <section className="h-full w-full flex items-center justify-center">
          <Swiper
            pagination={true}
            effect={"coverflow"}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            className="mySwiper w-full h-64"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              depth: 300,
              modifier: 0,
              slideShadows: false,
            }}
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
            navigation={{
              nextEl: '.button-adherents-next',
              prevEl: ".button-adherents-prev",
              enabled: true,
            }}
            loop={true}
            speed={700}
          >
            {adherents.map((el) => (
              <SwiperSlide key={el.id}>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-full w-32 h-32 2xl:w-36 2xl:h-36 mx-auto">
                    <img src={el.url} className="swiper-image-adherent " />
                  </div>
                  <div className="h-[50px] text-center font-semibold text-white lg:text-base">
                    {el.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <button className="button-adherents-prev absolute top-24 lg:top-20 -translate-y-1/2 left-4 lg:left-[14rem]  2xl:left-[22rem] transition-colors"><IconChevronLeft /> </button>
            <button className="button-adherents-next absolute top-24 lg:top-20 -translate-y-1/2 right-4 lg:right-[14rem] 2xl:right-[22rem] transition-colors "><IconChevronRight /></button>
          </Swiper>
        </section>
      </section>
    </section>
  );
}
