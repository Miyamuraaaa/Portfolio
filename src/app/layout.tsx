import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cliford Balce | GED0001 Digital Reading Portfolio",
  description: "A digital reading portfolio containing Reading Process Worksheets, Reader Responses, iCARE Activities, and reflections.",
  openGraph: {
    title: "Cliford Balce | GED0001 Digital Reading Portfolio",
    description: "A digital reading portfolio for GED0001.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col relative bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <Navbar />
        <main className="flex-grow flex flex-col relative pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
