import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/layout/socialSidebar";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scrollToTop"; // Yeni buton

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "NowArt Plicell | Online Perde Mağazası – Tül, Stor, Zebra ve Fon Perde Modelleri",
  description:
    "NowArt Plicell – Kaliteli, şık ve uygun fiyatlı perde modelleri. Tül, stor, zebra ve fon perdelerle evinize zarafet katın. Türkiye’nin güvenilir online perde mağazası!",
  openGraph: {
    title: "NowArt Plicell | Online Perde Mağazası",
    description:
      "Tül, stor, zebra ve fon perde modelleriyle evinize zarafet katın.",
    siteName: "NowArt Plicell",
    images: ["/og-image.webp"],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Sayfa içeriği ve koşullu sidebar */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        {/* Scroll to Top Butonu */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
