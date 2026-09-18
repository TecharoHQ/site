import Link from "next/link";

const capabilities = [
  {
    title: "Bot Protection",
    description:
      "Open-source and commercial tools that shield your infrastructure from automated abuse using proof-of-work challenges.",
  },
  {
    title: "AI Consultancy",
    description:
      "Strategic guidance on integrating AI into your products and workflows, from architecture to deployment.",
  },
  {
    title: "Custom Software",
    description:
      "End-to-end engineering for teams that need reliable, performant software built to their specifications.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Techaro",
  url: "https://techaro.lol",
  logo: "https://techaro.lol/img/logo_waffle.svg",
  description:
    "Security software, AI consultancy, and custom software services.",
  knowsAbout: ["Bot Protection", "AI Consultancy", "Software Development"],
  sameAs: [
    "https://www.wikidata.org/wiki/Q134301689",
    "https://github.com/TecharoHQ",
    "https://www.linkedin.com/company/techaro/",
    "https://bsky.app/profile/techaro.lol",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-8 sm:py-32">
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
          Creators of Anubis.
          <br />
          <span className="text-accent">Defenders of the web.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          Open-source bot protection, AI consultancy, and custom software
          services. We build the tools that keep the internet safe.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 font-semibold text-background transition-colors hover:bg-accent-hover"
          >
            See Our Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-3 sm:px-8">
          {capabilities.map(({ title, description }) => (
            <div key={title}>
              <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-text-secondary leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
