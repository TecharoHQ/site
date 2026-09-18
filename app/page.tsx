import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { graph, organization, ORG_ID, SITE } from "@/app/lib/jsonld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
};

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

const faqs = [
  {
    question: "What is Anubis?",
    answer:
      "Anubis is open-source bot protection for the web. It uses proof-of-work challenges to stop automated abuse while letting real users through. It is free, and you host it yourself. Installation instructions are at https://anubis.techaro.lol.",
  },
  {
    question: "What is the difference between Anubis and BotStopper?",
    answer:
      "BotStopper is commercial bot protection built on Anubis. It adds enterprise features, managed deployment, and dedicated support. BotStopper is coming soon.",
  },
  {
    question: "How much do Anubis and BotStopper cost?",
    answer:
      "Anubis is free and open source. BotStopper costs US$50 per month. Custom invoicing costs extra.",
  },
  {
    question: "When is Anubis the wrong tool?",
    answer:
      "Do not use Anubis for network-level volumetric DDoS attacks, or for endpoints whose clients cannot run JavaScript, such as API clients or RSS readers.",
  },
];

const jsonLd = graph(
  organization,
  {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Techaro",
    publisher: { "@id": ORG_ID },
  },
  ...capabilities.map(({ title, description }) => ({
    "@type": "Service",
    name: title,
    description,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
  })),
  {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
);

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />

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

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <dt className="font-heading text-lg font-bold tracking-tight text-foreground">
                  {question}
                </dt>
                <dd className="mt-2 text-text-secondary leading-relaxed">
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
