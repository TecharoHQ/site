import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import { anubis, botstopper, breadcrumbs, graph } from "@/app/lib/jsonld";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Techaro's products: Anubis open-source bot protection and BotStopper commercial bot protection.",
  alternates: {
    canonical: "/products",
    types: { "text/markdown": "/products.md" },
  },
};

const jsonLd = graph(anubis, botstopper, breadcrumbs("Products", "/products"));

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <JsonLd data={jsonLd} />
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Our Products
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        Tools built to protect the web from automated abuse.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <ProductCard
          name="Anubis"
          description="Open-source bot protection for the web. Anubis uses proof-of-work challenges to stop automated abuse while letting real users through seamlessly."
          accentColor="accent"
          href="https://anubis.techaro.lol"
          linkText="Learn More"
          imageSrc="/img/anubis-happy.webp"
          imageAlt="Anubis logo"
        />
        <ProductCard
          name="BotStopper"
          description="Commercial-grade bot protection built on the foundation of Anubis. Enterprise features, managed deployment, and dedicated support for organizations that need production-ready bot defense."
          accentColor="accent-teal"
          href="/pricing"
          linkText="See Pricing"
        />
      </div>
    </section>
  );
}
