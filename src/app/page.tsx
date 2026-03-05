import Hero from "@/components/home/Hero";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import ServicesOverview from "@/components/home/ServicesOverview";
import WorkPreview from "@/components/home/WorkPreview";
import ProcessSteps from "@/components/home/ProcessSteps";
import StatsStrip from "@/components/home/StatsStrip";
import Testimonials from "@/components/home/Testimonials";
import TechStack from "@/components/home/TechStack";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ServicesOverview />
      <WorkPreview />
      <ProcessSteps />
      <StatsStrip />
      <Testimonials />
      <TechStack />
      <HomeCTA />
    </>
  );
}
