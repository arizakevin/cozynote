import type { Metadata } from "next";
import { Inria_Serif, Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Providers } from "@/providers";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cozynote - Your Comfortable Space for Ideas",
  description:
    "Cozynote is a warmly designed note-taking app that provides a comfortable space for capturing, organizing, and nurturing your thoughts and ideas.",
  keywords: [
    "notes",
    "cozy",
    "productivity",
    "organization",
    "ideas",
    "writing",
    "comfort",
  ],
  authors: [{ name: "Cozynote Team" }],
  openGraph: {
    title: "Cozynote - Your Comfortable Space for Ideas",
    description:
      "Capture and nurture your thoughts in the cozy embrace of Cozynote's elegant note-taking experience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cozynote App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cozynote - Your Comfortable Space for Ideas",
    description:
      "Capture and nurture your thoughts in the cozy embrace of Cozynote's elegant note-taking experience.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inriaSerif.variable} ${inter.variable} font-sans bg-background`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
