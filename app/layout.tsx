import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nimble - Modern Furniture Store",
  description: "Discover curated furniture collections for your home. Shop modern, elegant, and timeless designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${instrumentSans.variable} antialiased`}>
        <QueryProvider>
          <LanguageProvider>
            {children}
            <ToastProvider />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
