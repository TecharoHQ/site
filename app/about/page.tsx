import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbs, graph, organization } from "@/app/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Techaro: a Canadian software company in Ottawa that makes Anubis and BotStopper, and provides AI consultancy and custom software.",
  alternates: {
    canonical: "/about",
    types: { "text/markdown": "/about.md" },
  },
};

const jsonLd = graph(
  {
    "@type": "AboutPage",
    url: "https://techaro.lol/about",
    about: organization,
  },
  breadcrumbs("About", "/about"),
);

const sections = [
  {
    title: "Who we are",
    body: "Techaro is a Canadian software company based in Ottawa, Ontario. Xe Iaso founded Techaro in 2024. We make security software, give AI consultancy, and build custom software.",
  },
  {
    title: "Anubis",
    body: "Our main product is Anubis, open-source bot protection for the web. Anubis puts a proof-of-work challenge in front of a website. Browsers of real users solve the challenge quickly. Scrapers and AI crawlers that send large volumes of requests must spend much more compute to get through. Anubis is free, and operators host it themselves. Groups such as the Linux kernel and GNOME use it to protect their infrastructure.",
  },
  {
    title: "BotStopper",
    body: "BotStopper is commercial bot protection built on Anubis. It adds enterprise features, managed deployment, and dedicated support for organizations that need production-ready bot defense. BotStopper is coming soon and will cost US$50 per month.",
  },
  {
    title: "Services",
    body: "We also give strategic guidance on how to integrate AI into products and workflows, from architecture to deployment. For teams that need reliable, fast software built to their specifications, we do end-to-end engineering work.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <JsonLd data={jsonLd} />
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        About Techaro
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        We build the tools that keep the internet safe.
      </p>
      <div className="mt-12 grid max-w-3xl gap-8 text-text-secondary leading-relaxed">
        {sections.map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-2">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
