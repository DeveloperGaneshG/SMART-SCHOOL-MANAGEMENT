import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vizag International School's 25-year legacy, mission, vision, leadership team, milestones, and achievements in Visakhapatnam.",
  openGraph: {
    title: "About Us | Vizag International School",
    description:
      "25 years of excellence, world-class faculty, and a commitment to holistic education at Vizag International School.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
