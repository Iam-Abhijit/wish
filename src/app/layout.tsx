import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#4a060a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Happy Birthday, My Love! ❤️ | A Special Surprise",
  description:
    "A special interactive birthday wish made with all my love. Pull the golden rope to open the curtain and reveal your birthday surprise!",
  keywords: [
    "happy birthday",
    "birthday wish",
    "romantic birthday surprise",
    "curtain surprise",
    "love greeting",
  ],
  authors: [{ name: "With Love" }],
  creator: "With Love",
  openGraph: {
    title: "Happy Birthday, My Love! ❤️",
    description:
      "A special interactive birthday surprise just for you. Open the curtain to see your wish!",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/birthday-roses.png",
        width: 1200,
        height: 630,
        alt: "Happy Birthday roses, letter, and celebration memories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday, My Love! ❤️",
    description:
      "A special interactive birthday surprise just for you. Open the curtain to reveal your wish!",
    images: ["/images/birthday-roses.png"],
  },
  icons: {
    icon: "/images/birthday-roses.png",
    apple: "/images/birthday-roses.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

