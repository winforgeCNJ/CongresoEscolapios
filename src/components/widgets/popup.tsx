"use client"

import IconClose from '../icons/icon-close';
import { Alegreya } from 'next/font/google';
import React, { useState } from 'react'
import IconArrowRigth2 from '../icons/icon-arrow-right-2'
import { useRouter } from 'next/navigation'
import claculateHasDatePassed from "@/lib/hasDatePassed";

export const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Popup() {

  const [isView, setIsView] = useState(true)
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/inscripcion');
    setIsView(false);
  };

  const hasDatePassed = claculateHasDatePassed();
  if (hasDatePassed) return <></>

  return (
    <>  
      {isView && (
        <>
        <div className='fixed inset-0 flex items-center justify-center z-[99999] px-4 lg:px-0'>
          <div className='max-w-sm lg:max-w-2xl lg:h-80 bg-gray-100 flex rounded-2xl overflow-hidden  relative animate-fade-up animate-delay-[800ms] lg:flex-row flex-col gap-y-4 shadow-xl '>
            <button className='absolute top-4 right-4 hover:scale-[1.05] transition-transform' onClick={() => setIsView(false)}>
              <IconClose />
            </button>
            <div className='order-1 lg:order-none flex items-center '>
              <img src='/assets/themes/theme-2.webp' width={190} height={384} className='lg:w-[22rem] lg:h-[24rem] h-44 w-full object-cover  '/>
              <img src='/assets/themes/theme-1.webp' width={190} height={384} className='lg:w-[11.875rem] lg:h-[24rem] h-44 w-full object-cover object-top block lg:hidden'/>
              <img src='/assets/themes/theme-3.webp' width={190} height={384} className='lg:w-[11.875rem] lg:h-[24rem] h-44 w-full object-cover object-top block lg:hidden'/>
            </div>
            <section className='lg:pl-6 pl-4 pr-4 text-primary pt-8 lg:pt-16'>
              <h3 className={`text-xl lg:text-3xl font-medium lg:mb-2 ${alegreya.className}`}>Inscribite al Congreso Humanista</h3>
              <h3 className='text-base lg:text-xl font-semibold -mb-1'>¡Tenes tiempo hasta el 15 de Agosto!</h3>  
              <p className='text-primary/80 text-sm mb-4'>Se acerca la fecha y te esperamos para compartir en el Colegio Santo Tomás, Córdoba, Argentina, los días 30, 31 de agosto y 01 de septiembre.</p>
              <button onClick={handleNavigate}  className="group relative inline-flex  items-center justify-center overflow-hidden text-primary to-secondary shadow-secondary/15  rounded-full bg-gradient-to-r from-white via-white px-4 py-2 text-sm tracking-wide shadow-lg transition-all hover:scale-[1.04] "><div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100"><IconArrowRigth2 /></div><span>Inscribite ahora</span></button>
            </section>
            <div className='absolute -bottom-2 -right-24 opacity-75 hidden lg:block'>
                <img src='/logo.png' className='w-56 h-32'/>
            </div>
          </div>
        
        <div className="fixed inset-0 -z-10 animate-fade animate-delay-[800ms] bg-black/40 top-0 left-0" role='button' onClick={() => setIsView(false)} />
        </div>
        </>
        
      )}
    </>
  )
}
