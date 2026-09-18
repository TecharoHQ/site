import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbs, graph, ORG_ID } from "@/app/lib/jsonld";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What techaro.lol collects about visitors: web server access logs and an Anubis cookie. No analytics, ads, or third-party trackers.",
  alternates: {
    canonical: "/privacy",
    types: { "text/markdown": "/privacy.md" },
  },
};

const jsonLd = graph(
  {
    "@type": "WebPage",
    url: "https://techaro.lol/privacy",
    name: "Privacy",
    publisher: { "@id": ORG_ID },
  },
  breadcrumbs("Privacy", "/privacy"),
);

const sections = [
  {
    title: "What we collect",
    body: "The web server for techaro.lol keeps access logs. Each log entry has your IP address, your user agent, the URL you requested, and the time of the request. We use these logs to keep the website working and to find abuse. We keep them for a limited time.",
  },
  {
    title: "Cookies",
    body: "Anubis protects this website. When your browser passes the Anubis proof-of-work challenge, Anubis sets a cookie that records that you passed. This cookie lets you use the website without solving the challenge again on each page. It does not track you across other websites. The website itself sets no other cookies.",
  },
  {
    title: "What we do not do",
    body: "This website has no analytics, no advertising, and no third-party trackers. The fonts are served from techaro.lol, so your browser does not send requests to a font provider. We do not sell or share visitor data.",
  },
  {
    title: "Email",
    body: "If you email sales@techaro.lol, we keep your message and your email address so that we can reply to you and continue the conversation.",
  },
  {
    title: "Questions",
    body: "For questions about this policy or to ask about data we have about you, email sales@techaro.lol.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <JsonLd data={jsonLd} />
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Privacy
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        What techaro.lol collects about visitors, and why.
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
