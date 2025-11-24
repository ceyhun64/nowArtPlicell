import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scrollToTop";
import { CartProvider } from "@/contexts/cartContext";
import { Toaster } from "sonner";
import Head from "next/head"; // 👈 ekledik

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
    "NowArt Plicell | Online Perde Mağazası – Plicell, Zebra, Store ve Ahşap Jaluzi Perde Modelleri",
  description:
    "NowArt Plicell – Kaliteli, şık ve uygun fiyatlı perde modelleri. Tül, stor, zebra ve fon perdelerle evinize zarafet katın. Türkiye’nin güvenilir online perde mağazası!",
  openGraph: {
    title: "NowArt Plicell | Online Perde Mağazası",
    description:
      "Plicell, zebra, stor ve ahşap jaluzi perde modelleriyle evinize zarafet katın.",
    siteName: "NowArt Plicell",
    images: ["https://www.nowartplicell.com/og-image.webp"], // ✅ MUTLAK URL    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <Head>
        {/* 🔹 Kritik performans optimizasyonları */}
        <link rel="preconnect" href="https://www.nowartplicell.com" />
        <link rel="preload" as="style" href="/css/6ded801ecd631cf3.css" />
        <link rel="preload" as="style" href="/css/de70bee13400563f.css" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/media/ba015fad6dcf6784-s.woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ClientLayoutWrapper>
            <main>{children}</main>
          </ClientLayoutWrapper>
          <ScrollToTopButton />
          <Toaster
            richColors
            position="bottom-right"
            toastOptions={{
              style: { zIndex: 9999 },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
