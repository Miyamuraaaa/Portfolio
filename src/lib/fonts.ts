import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-variable.ttf",
  weight: "300 700",
  display: "swap",
  variable: "--font-space-grotesk",
});

export const jetbrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMono-variable.ttf",
  weight: "100 800",
  display: "swap",
  variable: "--font-jetbrains-mono",
});
