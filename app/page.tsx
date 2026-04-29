import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import StatsSection from "@/components/public/StatsSection";
import FacilitiesGrid from "@/components/public/FacilitiesGrid";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="bg-navy overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsSection />
      <FacilitiesGrid />
      <Footer />
    </main>
  );
}
