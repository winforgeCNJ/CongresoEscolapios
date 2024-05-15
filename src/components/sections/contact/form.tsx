"use client";

import IconError from "@/components/icons/icon-error";
import IconLoad from "@/components/icons/icon-load";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { sendEmail } from "./send-email";
import SuccessForm from "./success-form";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/cn";

export type InitialValuesT = {
  name: string;
  lastName: string;
  mail: string;
  consult: string;
};

const initialValues: InitialValuesT = {
  name: "",
  lastName: "",
  mail: "",
  consult: "",
};

const validationSchema = Yup.object({
  mail: Yup.string().email("Correo no valido").required("El correo requrido"),
  name: Yup.string().required("El nombre es requrido"),
  lastName: Yup.string().required("El apellido es requrido"),
  consult: Yup.string()
    .required("La consulta es requrida")
    .min(6, "La consulta debe tener alemenos 6 caracteres"),
});

export default function Form() {
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState<"iddle" | "success" | "error">("iddle");

  const onSubmit = async (values: InitialValuesT) => {
    setLoad(true);
    try {
      const res = await sendEmail(values);

      if (res.type === "error") {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const { handleChange, errors, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  if (status === "success") return <SuccessForm />;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-28 w-full max-w-sm rounded-[3rem] bg-white/20 px-6 py-6 text-white lg:max-w-5xl lg:px-12 2xl:mb-0 2xl:max-w-[80rem]"
    >
      <h2 className="text-3xl font-light lg:text-4xl 2xl:text-5xl">
        Contactanos
      </h2>
      <p className="mb-3 text-xl font-medium 2xl:text-2xl">
        Para saber más acerca de promociones especiales, comida o alojamiento.
      </p>
      <div className="mb-3 flex w-full items-center justify-between gap-x-2 lg:gap-x-12">
        <Input
          onChange={handleChange}
          name="name"
          placeholder="NOMBRE"
          error={errors?.name}
          className={`${errors.name && "border-red-400"}`}
        />
        <Input
          onChange={handleChange}
          name="lastName"
          placeholder="APELLIDO"
          error={errors?.lastName}
          className={`${errors.lastName && "border-red-400"}`}
        />
      </div>

      <div className="mb-3">
        <Input
          onChange={handleChange}
          name="mail"
          placeholder="MAIL"
          type="email"
          className={` ${errors.mail && "border-red-400"}`}
          error={errors?.mail}
        />
      </div>

      <div className="flex w-full flex-col items-end gap-4  lg:flex-row">
        <label className="relative flex w-full flex-col gap-y-4">
          <textarea
            className={cn(
              "h-56 w-full resize-none rounded-[1.5rem] border-2 bg-transparent px-6 py-4 text-lg outline-none focus:border-4 focus:border-secondary lg:h-72",
              errors.consult && "border-red-400",
            )}
            name="consult"
            placeholder="TU CONSULTA"
            onChange={handleChange}
          />
          <small
            className={cn(
              "point- flex translate-y-2 items-center gap-x-2 pl-6 text-red-400 opacity-0 transition-all ease-in-out",
              errors?.consult && "translate-y-0 opacity-100",
            )}
          >
            <IconError /> {errors.consult}
          </small>
        </label>
        <Button
          disabled={load}
          className="mb-10 py-4 font-medium hover:tracking-normal"
        >
          {load ? (
            <IconLoad className="block w-[3.963rem] animate-spin" />
          ) : (
            "ENVIAR"
          )}
        </Button>
      </div>
    </form>
  );
}
