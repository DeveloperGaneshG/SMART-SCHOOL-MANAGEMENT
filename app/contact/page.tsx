import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vizag International School. Find our address, phone numbers, email, and send us a message. We'd love to hear from you.",
  openGraph: {
    title: "Contact Us | Vizag International School",
    description:
      "Get in touch with Vizag International School. NH-16, Bheemunipatnam, Visakhapatnam – 531 163.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
