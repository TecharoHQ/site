import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { anubis, botstopper, breadcrumbs, graph } from "@/app/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for Techaro's products: Anubis is free and open source. BotStopper is US$50 per month.",
  alternates: {
    canonical: "/pricing",
    types: { "text/markdown": "/pricing.md" },
  },
};

const jsonLd = graph(anubis, botstopper, breadcrumbs("Pricing", "/pricing"));

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
      <JsonLd data={jsonLd} />
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
