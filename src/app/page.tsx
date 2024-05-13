import Inscription from "@/components/sections/inscription";
import Objectives from "@/components/sections/objectives";
import Chronogram from "@/components/sections/chronogram";
import Contact from "@/components/sections/contact";
import Themes from "@/components/sections/themes";
import Footer from "@/components/widgets/footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Objectives />
      <Themes />
      <Chronogram />
      <Inscription />
      <div className="relative">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
