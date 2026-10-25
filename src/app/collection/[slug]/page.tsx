import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { worksIn, workCount } from "@/data/content";
import { collectionPages } from "@/data/collections";
import { profile } from "@/data/profile";
import WorkFrame from "@/components/ui/WorkFrame";
import "@/app/collection.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return collectionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = collectionPages.find((item) => item.slug === slug);
  return page ? { title: `${page.title} | GED0001 Digital Reading Portfolio`, description: page.description } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = collectionPages.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const page = collectionPages[index];
  const works = worksIn(page.category);

  return (
    <div className="cp-page">
      <header className="cp-top">
        <Link href="/" className="cp-brand" aria-label="GED0001 Digital Reading Portfolio, home">
          <span className="cp-brand-mark">B<span>.</span></span>
          <span className="cp-brand-text"><strong>GED0001</strong><small>READING PORTFOLIO</small></span>
        </Link>
        <Link href={`/#${page.slug}`} className="cp-back"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</Link>
      </header>

      <main id="main" className="cp-shell">
        <section className="cp-hero" aria-labelledby="cp-title">
          <p className="eyebrow cp-eyebrow">0{index + 2} / THE GED0001 COLLECTION</p>
          <h1 id="cp-title">{page.title}</h1>
          <p className="cp-lead">{page.description}</p>
          <p className="cp-count" data-empty={works.length === 0}>{workCount(works.length)}</p>
          <nav className="cp-switch" aria-label="Collection chapters">
            {collectionPages.map((item) => (
              <Link key={item.slug} href={`/collection/${item.slug}`} aria-current={item.slug === page.slug ? "page" : undefined}>{item.title}</Link>
            ))}
          </nav>
        </section>

        {works.length > 0 ? (
          <section className="cp-grid" aria-label={`${page.title} works`}>
            {works.map((work, position) => <WorkFrame key={work.id} work={work} index={position} label={page.label} action={page.action} />)}
          </section>
        ) : (
          <section className="cp-empty" aria-label="No works yet">
            <p className="eyebrow">TO BE COLLECTED</p>
            <p>Nothing is shown here until real coursework is added. No placeholder work is invented.</p>
          </section>
        )}
      </main>

      <footer className="cp-foot">
        <div><p className="eyebrow">GED0001 / DIGITAL READING PORTFOLIO</p><p>By {profile.name}</p></div>
        <Link href="/" className="cp-back">Back to the full portfolio <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </footer>
    </div>
  );
}
