"use client";

import Title from "@/components/ui/title";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Courses() {
    const [isHovered, setIsHovered] = useState(false); // Para efecto en escritorio
    const [isInView, setIsInView] = useState(false); // Para efecto en móviles
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null); // Referencia a la sección
    const router = useRouter();

    const handleClick = () => {
        router.push("https://congreso-de-educacion-humanista.tiendup.com/"); 
    };

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const sectionHeight = rect.height;

                // Calcular el progreso del scroll relativo a la sección
                const startTrigger = sectionHeight * 0.3; // Comienza al 30% de la sección
                const endTrigger = sectionHeight * 0.7; // Termina al 70% de la sección

                if (rect.top <= viewportHeight - startTrigger && rect.bottom >= viewportHeight - endTrigger) {
                    const progress = (viewportHeight - rect.top - startTrigger) / (endTrigger - startTrigger);
                    const clampedProgress = Math.max(0, Math.min(1, progress));
                    setScrollProgress(clampedProgress);
                    setIsInView(clampedProgress > 0.5);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            id="cursos"
            ref={sectionRef}
            className="relative flex h-screen w-full flex-col items-center overflow-x-hidden overflow-y-hidden lg:flex-row"
        >
            {/* Título */}
            <div className="absolute left-6 top-12 z-20 lg:left-12 2xl:left-28">
                <Title title="Cursos del" active="congreso" />
            </div>

            {/* Contenedor principal */}
            <div className="relative h-screen w-full lg:block">
                {/* Fondo con opacidad */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-slate-700"></div>

                    <img
                        src="/assets/courses/background-courses-default.webp"
                        className={`absolute h-full w-full object-cover object-center transition-opacity duration-1000 ${isHovered ? "opacity-0" : "opacity-30"
                            }`}
                        alt="Imagen por defecto"
                    />

                    <img
                        src="/assets/courses/background-courses-hover.webp"
                        className={`absolute h-full w-full object-cover object-center transition-opacity duration-1000 ${isHovered ? "opacity-30" : "opacity-0"
                            }`}
                        alt="Imagen al hacer hover"
                    />
                </div>

                {/* Contenido centrado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-center">
                    <h1
                        className="text-styled z-50 font-alegreya text-5xl font-medium text-white md:text-6xl lg:text-9xl 384px:text-4xl"
                        style={{
                            WebkitTextFillColor: "white",
                        }}
                    >
                        Nuestras Ponencias
                    </h1>
                    <button
                        onClick={handleClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="z-50 text-primary to-secondary shadow-secondary/15 inline-block rounded-full bg-gradient-to-r from-white via-white px-8 py-2 text-sm tracking-normal shadow-lg transition-all hover:scale-[1.15]"
                    >
                        Más información
                    </button>
                </div>

                {/* Logo que se desplaza */}
                <img
                    src="/LogoSolSolo.png"
                    alt="Logo"
                    className={`transform transition-all duration-500 ease-in-out 
                    absolute w-[250vw] max-w-none
                    ${scrollProgress > 0.95
                            ? "right-[50%] bottom-[0em] translate-x-[50%] w-[75vw]" // Centrado al hacer scroll
                            : "right-[33em] w-[190vw] bottom-[-2em] translate-x-[100%]" // Posicionado a la derecha
                        }
                    sm:absolute sm:w-[35em] sm:right-[1em] sm:bottom-[0em] sm:translate-x-0 sm:mt-0
                    md:w-[40em] md:right-[0.5em] md:bottom-[0em]
           
                    ${isHovered
                            ? "lg:right-[50%] lg:bottom[0] lg:w-[15em] lg:translate-x-[50%] xl:right-[50%] xl:bottom[0] xl:w-[15em] xl:translate-x-[50%]"
                            : "lg:w-[58em] xl:w-[58em]"
                        }
                    `}
                    style={{
                        transform: `translateX(${scrollProgress > 0.95 ? '50%' : '100%'})`,
                        transition: 'all 0.5s ease-in-out'
                    }}
                />
            </div>
        </section>

    );
}