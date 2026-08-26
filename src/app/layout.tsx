import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "林明 | Fullstack Engineer Portfolio",
  description:
    "林明（はやし あきら）フルスタックエンジニアのポートフォリオ。Webシステム開発・インフラ・AI連携の実績を掲載。",
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
    <html lang="ja" className={`${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
