import Presentation from "@/components/sections/presentation"
import Objectives from "@/components/sections/objectives";
import Chronogram from "@/components/sections/chronogram";
import Adherents from "@/components/sections/adherents";
import Location from "@/components/sections/location"
import Contact from "@/components/sections/contact";
import Courses from "@/components/sections/courses";
import Themes from "@/components/sections/themes";
import Footer from "@/components/widgets/footer";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Presentation />
      <Objectives />
      <Themes />
      <Courses />
      {/* <Chronogram /> */}
      <Adherents />
      {/* <Location /> */}
      <div className="relative">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
