import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for Techaro's products: Anubis is free and open source. BotStopper is US$50 per month.",
  alternates: {
    canonical: "/pricing",
    types: { "text/markdown": "/pricing.md" },
  },
};

const publisher = {
  "@type": "Organization",
  name: "Techaro",
  url: "https://techaro.lol",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Anubis",
    url: "https://anubis.techaro.lol",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "Open-source bot protection for the web that uses proof-of-work challenges to stop automated abuse.",
    publisher,
    offers: {
      "@type": "Offer",
      url: "https://techaro.lol/pricing",
      price: "0",
      priceCurrency: "USD",
      description: "Free and open source. Self-hosted.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BotStopper",
    url: "https://techaro.lol/products",
    applicationCategory: "SecurityApplication",
    description:
      "Commercial bot protection built on Anubis, with enterprise features, managed deployment, and dedicated support.",
    publisher,
    offers: {
      "@type": "Offer",
      url: "https://techaro.lol/pricing",
      price: "50.00",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "50.00",
        priceCurrency: "USD",
        unitCode: "MON",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
      description:
        "US$50 per month. Custom invoicing is available for an additional surcharge.",
    },
  },
];

const tiers = [
  {
    name: "Anubis",
    price: "Free",
    period: "open source",
    accent: "text-accent",
    features: [
      "Proof-of-work bot protection",
      "Self-hosted: you run and operate it",
      "Community support",
    ],
    href: "https://anubis.techaro.lol",
    linkText: "Read the docs",
  },
  {
    name: "BotStopper",
    price: "US$50",
    period: "per month",
    accent: "text-accent-teal",
    features: [
      "Everything in Anubis",
      "Enterprise features",
      "Managed deployment",
      "Dedicated support",
      "Custom invoicing available for a surcharge",
    ],
    href: "/contact",
    linkText: "Contact sales",
  },
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Pricing
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        Start free with Anubis. Upgrade to BotStopper when you need managed
        deployment and support.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col rounded-xl border border-border bg-bg-card p-6"
          >
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
              {tier.name}
            </h2>
            <p className="mt-4">
              <span
                className={`font-heading text-4xl font-bold tracking-tight ${tier.accent}`}
              >
                {tier.price}
              </span>
              <span className="ml-2 text-text-secondary">{tier.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-text-secondary">
              {tier.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
            <a
              href={tier.href}
              className={`mt-6 text-sm font-semibold ${tier.accent} transition-colors hover:text-accent-hover`}
            >
              {tier.linkText} &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
