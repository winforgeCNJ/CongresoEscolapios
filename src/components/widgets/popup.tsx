"use client";

import IconClose from "../icons/icon-close";
import { Alegreya } from "next/font/google";
import React, { useState } from "react";
import IconArrowRigth2 from "../icons/icon-arrow-right-2";
import { useRouter } from "next/navigation";
import claculateHasDatePassed from "@/lib/hasDatePassed";

export const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Popup() {
  const [isView, setIsView] = useState(true);
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/inscripcion");
    setIsView(false);
  };

  return (
    <>
      {isView && (
        <>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 lg:px-0">
            <div className="relative flex max-w-sm animate-fade-up flex-col gap-y-4 overflow-hidden  rounded-2xl bg-gray-100 shadow-xl animate-delay-[800ms] lg:h-80 lg:max-w-2xl lg:flex-row ">
              <button
                className="absolute right-4 top-4 transition-transform hover:scale-[1.05]"
                onClick={() => setIsView(false)}
              >
                <IconClose />
              </button>
              <div className="order-1 flex items-center lg:order-none ">
                <img
                  src="/assets/themes/theme-2.webp"
                  width={190}
                  height={384}
                  className="h-44 w-full object-cover lg:h-[24rem] lg:w-[22rem]  "
                />
                <img
                  src="/assets/themes/theme-1.webp"
                  width={190}
                  height={384}
                  className="block h-44 w-full object-cover object-top lg:hidden lg:h-[24rem] lg:w-[11.875rem]"
                />
                <img
                  src="/assets/themes/theme-3.webp"
                  width={190}
                  height={384}
                  className="block h-44 w-full object-cover object-top lg:hidden lg:h-[24rem] lg:w-[11.875rem]"
                />
              </div>
              <section className="pl-4 pr-4 pt-8 text-primary lg:pl-6 lg:pt-16">
                <h3
                  className={`text-xl font-medium lg:mb-2 lg:text-3xl ${alegreya.className}`}
                >
                  Inscribite al Congreso Humanista
                </h3>
                <h3 className="-mb-1 text-base font-semibold lg:text-xl">
                  ¡Tenes tiempo hasta el 15 de Agosto!
                </h3>
                <p className="mb-4 text-sm text-primary/80">
                  Se acerca la fecha y te esperamos para compartir en el Colegio
                  Santo Tomás, Córdoba, Argentina, los días 30, 31 de agosto y
                  01 de septiembre.
                </p>
                <button
                  onClick={handleNavigate}
                  className="group relative inline-flex  items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-white  via-white to-secondary px-4 py-2 text-sm tracking-wide text-primary shadow-lg shadow-secondary/15 transition-all hover:scale-[1.04] "
                >
                  <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                    <IconArrowRigth2 />
                  </div>
                  <span>Inscribite ahora</span>
                </button>
              </section>
              <div className="absolute -bottom-2 -right-24 hidden opacity-75 lg:block">
                <img src="/logo.png" className="h-32 w-56" />
              </div>
            </div>

            <div
              className="fixed inset-0 left-0 top-0 -z-10 animate-fade bg-black/40 animate-delay-[800ms]"
              role="button"
              onClick={() => setIsView(false)}
            />
          </div>
        </>
      )}
    </>
  );
}
