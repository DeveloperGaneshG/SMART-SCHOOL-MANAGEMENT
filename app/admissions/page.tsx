import type { Metadata } from "next";
import AdmissionsClient from "./AdmissionsClient";

export const metadata: Metadata = {
  title: "Admissions 2025–26",
  description:
    "Apply for admissions at Vizag International School. Step-by-step process, required documents, and online application for 2025–26. Seats filling fast.",
  openGraph: {
    title: "Admissions 2025–26 | Vizag International School",
    description:
      "Join 2,500+ students at Vizag International School. Apply online for CBSE admissions 2025–26.",
  },
};

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}
