import type { Metadata } from "next";
import { Podkova, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import WebMCP from "@/app/components/WebMCP";

const podkova = Podkova({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-podkova",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techaro.lol"),
  title: {
    default: "Techaro — Security Software & AI Consultancy",
    template: "%s | Techaro",
  },
  description:
    "Techaro builds Anubis, BotStopper, and provides AI consultancy and custom software services.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Techaro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${podkova.variable} ${schibstedGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WebMCP />
      </body>
    </html>
  );
}
