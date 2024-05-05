import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GradR",
  description: "Calculate grades for courses at IIIT Hyderabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/favicon.jpg" sizes="any" />
      </head>
      <GoogleAnalytics gaId="G-E4WMLNBY0T" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
