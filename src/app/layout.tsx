import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingCartButton from "@/components/FloatingCartButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SOLO | High-End Minimalist Clothing",
  description: "Experience the essence of minimalism with SOLO's high-end clothing line.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased overflow-x-hidden`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <FloatingCartButton />
      </body>
    </html>
  );
}
