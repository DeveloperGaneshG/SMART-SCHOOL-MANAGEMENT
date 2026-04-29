import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Providers from "@/components/auth/Providers";
import { ToastProvider } from "@/components/ui/Toast";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vizag International School | Shaping Tomorrow's Leaders",
    template: "%s | Vizag International School",
  },
  description:
    "Vizag International School offers world-class CBSE education in Visakhapatnam. 25 years of excellence, smart campus, and holistic development for 2,500+ students.",
  keywords: [
    "vizag international school",
    "best school visakhapatnam",
    "cbse school vizag",
    "admission 2025-26",
    "smart school management",
    "visakhapatnam school",
    "bheemunipatnam school",
    "cbse school andhra pradesh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vizaginternational.edu.in",
    siteName: "Vizag International School",
    title: "Vizag International School | Shaping Tomorrow's Leaders",
    description:
      "Vizag International School offers world-class CBSE education in Visakhapatnam. 25 years of excellence, smart campus, and holistic development.",
    images: [
      {
        url: "https://vizaginternational.edu.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vizag International School Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizag International School | Shaping Tomorrow's Leaders",
    description:
      "Vizag International School offers world-class CBSE education in Visakhapatnam. 25 years of excellence.",
    images: ["https://vizaginternational.edu.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vizaginternational.edu.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Providers>
          <ToastProvider>
            {children}
            <ScrollToTop />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
