import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import "./mobile-motion.css";
import CosmicAtmosphere from "@/components/ui/CosmicAtmosphere";

export const metadata: Metadata = {
  title: "GED0001 | DIGITAL READING PORTFOLIO | By Cliford V. Balce",
  description:
    "A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001. By Cliford V. Balce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <CosmicAtmosphere />
        <div className="site-foreground">{children}</div>
      </body>
    </html>
  );
}
