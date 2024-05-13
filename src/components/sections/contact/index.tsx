import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React from "react";

export default function Contact() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center py-4 lg:py-0">
      <form className="mb-28 w-full max-w-sm rounded-[3rem] bg-white/20 px-6 py-6 text-white lg:max-w-5xl lg:px-12 2xl:mb-0 2xl:max-w-[80rem]">
        <h2 className="text-3xl font-light lg:text-4xl 2xl:text-5xl">
          Contactanos
        </h2>
        <p className="mb-4 text-xl font-medium 2xl:text-2xl">
          Para saber más acerca de promociones especiales, comida o alojamiento.
        </p>
        <div className="mb-4 flex w-full items-center justify-between gap-x-2 lg:gap-x-12">
          <Input name="name" placeholder="NOMBRE" />
          <Input name="lastName" placeholder="APELLIDO" />
        </div>
        <Input name="mail" placeholder="MAIL" type="email" className="mb-4" />

        <div className="flex w-full flex-col items-end gap-4 lg:flex-row ">
          <textarea
            className="h-56 w-full resize-none rounded-[1.5rem] border-2 bg-transparent px-6 py-4 text-lg outline-none focus:border-4 focus:border-secondary lg:h-72"
            name="consult"
            placeholder="TU CONSULTA"
          />
          <Button className="py-4 font-medium hover:tracking-normal">
            ENVIAR
          </Button>
        </div>
      </form>

      <div className="-top4 absolute left-0 top-0 -z-10 h-full w-full lg:h-screen">
        <img
          alt="background de la seccion contacto"
          className="hidden h-full w-full lg:block"
          draggable={false}
          width="1440"
          height="800"
          src="/assets/contact/contact-background.webp"
        />
        <img
          alt="background de la seccion contacto"
          className="block h-full w-full lg:hidden"
          draggable={false}
          width="420"
          height="720"
          src="/assets/contact/contact-background-mobile.webp"
        />
      </div>
    </section>
  );
}
