import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duraxx | Quality and Trust",
  description: "Official wholesale distributor of premium zinc-air hearing aid batteries (Varta, Powerone, Duracell) and certified earmold lab equipment.",
  keywords: ["Hearing Aid Batteries", "Audiology Equipment", "Earmold Lab Equipment", "Varta Batteries", "B2B Audiology Distributor"],
  authors: [{ name: "Duraxx GmbH" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-brand-navy bg-brand-bg flex flex-col min-h-screen">
        <LanguageProvider>
          <Header />
          <main className="flex-grow pt-20 lg:pt-24">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
