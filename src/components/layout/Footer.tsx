import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="portfolio-footer editorial-shell">
      <div><p className="eyebrow">GED0001 / DIGITAL READING PORTFOLIO</p>
        <p className="mt-3 text-sm text-foreground/65">By Cliford V. Balce</p></div>
      <p className="footer-note">Beyond the Pages</p>
      <Link href="/#home" data-cursor="link" className="flex items-center gap-3 text-sm">Back to top <ArrowUpRight size={17} /></Link>
    </footer>
  );
}
