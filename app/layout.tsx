import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Moghal Saif",
  description: "Designer, builder, thinker.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} ${bebasNeue.variable}`}
    >
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "var(--site-bg, #FAF8F4)", color: "var(--site-fg, #1A1814)" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
