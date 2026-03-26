import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Techaro for sales inquiries, partnerships, and support.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Get In Touch
      </h1>
      <p className="mt-4 max-w-xl text-text-secondary leading-relaxed">
        Interested in our products or services? Reach out to our sales team.
      </p>
      <a
        href="mailto:sales@techaro.lol"
        className="mt-8 inline-block font-heading text-2xl font-bold text-accent transition-colors hover:text-accent-hover md:text-3xl"
      >
        sales@techaro.lol
      </a>
    </section>
  );
}
