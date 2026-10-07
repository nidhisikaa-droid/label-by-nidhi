import type { Metadata } from "next";
import { Anton, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CartDrawer from "@/components/CartDrawer";

const display = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const accent = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LABEL BY NIDHI — Wear Your Confidence",
    template: "%s | LABEL BY NIDHI",
  },
  description:
    "LABEL BY NIDHI — bold, premium fashion for the confident. Shop new arrivals, women's and men's edits, collections and sale. Wear your confidence.",
  keywords: [
    "fashion",
    "premium fashion",
    "streetwear",
    "LABEL BY NIDHI",
    "clothing",
    "online shopping",
  ],
  openGraph: {
    title: "LABEL BY NIDHI — Wear Your Confidence",
    description:
      "Bold, premium fashion for the confident. New arrivals, edits, collections and sale.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${accent.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
