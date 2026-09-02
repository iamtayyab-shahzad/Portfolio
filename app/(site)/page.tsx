import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactSection } from "@/components/home/ContactSection";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Skills } from "@/components/home/Skills";
import { Clients, Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Services />
      <FeaturedWork />
      <Skills />
      <AboutTeaser />
      <Process />
      <Testimonials />
      <Clients />
      <ContactSection compact />
    </>
  );
}
