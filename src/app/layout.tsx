import Header from "@/components/widgets/header";
import { Work_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Congreso de Educación Humanista - Escuelas Pías",
  description: "Congreso de Educación Humanista - Escuelas Pías",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={workSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
