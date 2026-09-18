import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "See what our users say about Anubis and Techaro's products.",
  alternates: {
    canonical: "/testimonials",
    types: { "text/markdown": "/testimonials.md" },
  },
};

const testimonials = [
  {
    org: "Linux Kernel",
    services: [
      { name: "CGit", link: "https://git.kernel.org" },
      { name: "Mailing List Archives", link: "https://lore.kernel.org" },
    ],
    name: "K. Ryabitsev",
    title: "Director of Linux Foundation IT",
    avatarSrc: "/img/social-proof/linux-kernel-social-proof-avatar.jpg",
    sourceLink:
      "https://social.kernel.org/objects/1bb84190-f207-4adc-ac0e-8eb87a8a60f9",
    quotes: [
      <>
        <a
          className="text-accent hover:text-accent-hover"
          href="https://git.kernel.org"
        >
          git.kernel.org
        </a>{" "}
        and{" "}
        <a
          className="text-accent hover:text-accent-hover"
          href="https://lore.kernel.org"
        >
          lore.kernel.org
        </a>{" "}
        now require proof of work. Big thanks to Anubis developers for filling
        this important need.
      </>,
    ],
  },
  {
    org: "GNOME",
    services: [{ name: "GitLab", link: "https://gitlab.gnome.org" }],
    name: "Emmanuele Bassi",
    title: "GNOME Team",
    avatarSrc: "/img/social-proof/gnome-social-proof-avatar.jpg",
    sourceLink:
      "https://discourse.gnome.org/t/anime-girl-on-gnome-gitlab/27689/10",
    quotes: [
      "Folks, unless you have a proposal (and a budget) for replacing Anubis with a CDN with protection against hostile web scrapers, all these arguments are pointless bikeshed.",
      "Also: if you're intimidated or put off by a drawing that appears, on average, for less than 5 seconds, I strongly recommend you turn off your computer and go outside for a while.",
    ],
  },
];

export default function TestimonialsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Testimonials
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        What our users say about Anubis.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {testimonials.map((t) => (
          <div
            key={t.org}
            className="flex flex-col rounded-xl border border-border bg-bg-card p-6"
          >
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
              {t.org}
            </h2>

            <ul className="mt-2 text-sm text-text-secondary">
              {t.services.map((svc) => (
                <li key={svc.name}>
                  <a
                    href={svc.link}
                    className="transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {svc.name}
                  </a>
                </li>
              ))}
            </ul>

            <blockquote className="mt-4 flex-1 border-l-2 border-accent/40 pl-4 text-foreground">
              {t.quotes.map((q, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {q}
                </p>
              ))}
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <Image
                src={t.avatarSrc}
                alt={`Photo of ${t.name}`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-text-secondary">{t.title}</p>
              </div>
            </div>

            <a
              href={t.sourceLink}
              className="mt-4 text-sm text-accent transition-colors hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
