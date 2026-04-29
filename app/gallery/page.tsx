import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photos and moments from campus life at Vizag International School — sports, cultural events, academics, infrastructure, and more.",
  openGraph: {
    title: "Gallery | Vizag International School",
    description:
      "Campus moments from Vizag International School — sports, cultural events, academics, and infrastructure.",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
