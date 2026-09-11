import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Skills } from "@/components/home/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Services />
      <Skills />
      <Process />
      <AboutTeaser />
      <FinalCta />
    </>
  );
}
