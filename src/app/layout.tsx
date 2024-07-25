import Header from "@/components/widgets/header"
import Popup from "@/components/widgets/popup";
import { Work_Sans } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.congresohumanista.com"),
  title: "Congreso de Educación Humanista - Escuelas Pías",
  description:
    "Participa en nuestro congreso y reflexiona sobre la auténtica educación con raíces en la tradición occidental y cristiana. Descubre materiales y estrecha lazos con otros grupos educativos.",
  alternates: {
    canonical: "https://www.congresohumanista.com",
  },
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "congreso de educación humanista",
    "educación cristiana",
    "grupos eclesiales y sociales",
    "lazos educativos y sociales",
    "eventos educativos cristianos",
    "propuesta educativa cristiana",
    "materiales bibliograficos de educación",
  ],
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
        <Popup />
        {children}
      </body>
    </html>
  );
}
