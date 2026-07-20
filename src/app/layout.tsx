import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";
import VisitorTracker from "@/components/layout/VisitorTracker";

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
      <body className="font-sans antialiased text-brand-navy bg-brand-bg flex flex-col min-h-screen overflow-x-hidden">
        <VisitorTracker />
        <LanguageProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
