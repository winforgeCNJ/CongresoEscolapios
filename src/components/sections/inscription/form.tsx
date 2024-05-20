import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import React from 'react'

export default function Form() {
  return (
    <form className="w-full  lg:space-y-6 lg:px-28 2xl:px-56">
    <div className="flex w-full flex-col  gap-2 lg:flex-row lg:items-center lg:gap-12">
      <h3 className="whitespace-nowrap text-2xl font-medium text-white 2xl:text-3xl">
        Formá parte
      </h3>
      <Input name="dni" type="number" placeholder="DNI"  className="mt-2 lg:mt-6"/>
    </div>
    <div className="flex w-full items-center gap-x-4 lg:gap-x-6">
      <Input name="name" placeholder="NOMBRE" />
      <Input name="lastName" placeholder="APELLIDO" />
    </div>
    <div className="flex flex-col lg:flex-row w-full items-center gap-x-4 lg:gap-x-6">
      <Input type="email" name="mail" placeholder="MAIL" />
      <Input name="phone" placeholder="CEL..:" />
    </div>
    <Input name="cost" type="number" placeholder="COSTO" />
    <div className="mt-4 flex w-full items-center justify-center">
      <Button className="py-3 font-medium">SIGUIENTE</Button>
    </div>
  </form>
  )
}
