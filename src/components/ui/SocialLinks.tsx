import { Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import "@/app/about.css";

/** Icon-only contact links. Each icon is a real link with an accessible name and a 44px touch target. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`social-links ${className}`.trim()} aria-label="Contact links">
      <li>
        <a
          href={profile.instagram.url}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${profile.instagram.handle} (opens in a new tab)`}
          title={`Instagram ${profile.instagram.handle}`}
          data-cursor="link"
        >
          <InstagramIcon size={20} />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${profile.email}`}
          className="social-link"
          aria-label={`Email ${profile.email}`}
          title={profile.email}
          data-cursor="link"
        >
          <Mail size={20} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
