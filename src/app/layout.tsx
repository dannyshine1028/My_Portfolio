import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "林明 | Systems Engineer Portfolio",
  description:
    "林明（Lin Ming）システムエンジニアのポートフォリオサイト。Web開発・インフラ構築・システム開発の実績を掲載。",
  icons: {
    icon: [
      { url: "/assets/logo/favicon.ico" },
      { url: "/assets/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logo/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/logo/logo-256.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${mono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
