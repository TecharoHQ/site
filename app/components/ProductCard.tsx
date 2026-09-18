import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  accentColor: "accent" | "accent-teal";
  href?: string;
  linkText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProductCard({
  name,
  description,
  accentColor,
  href,
  linkText = "Learn More",
  imageSrc,
  imageAlt,
}: ProductCardProps) {
  const accentClasses =
    accentColor === "accent"
      ? "border-accent/30 bg-accent/10 text-accent"
      : "border-accent-teal/30 bg-accent-teal/10 text-accent-teal";

  const buttonClasses =
    accentColor === "accent"
      ? "bg-accent text-background hover:bg-accent-hover"
      : "bg-accent-teal text-background hover:bg-accent-teal/80";

  return (
    <div className="rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-accent/30">
      <div
        className={`mb-6 flex h-48 items-center justify-center rounded-lg border ${accentClasses}`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            width={160}
            height={160}
            className="h-36 w-auto object-contain"
          />
        ) : (
          <span className="font-heading text-2xl font-bold tracking-tight">
            {name}
          </span>
        )}
      </div>
      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
        {name}
      </h3>
      <p className="mt-2 text-text-secondary leading-relaxed">{description}</p>
      {href ? (
        <a
          href={href}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`mt-4 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${buttonClasses}`}
        >
          {linkText}
          <span className="ml-1.5" aria-hidden="true">
            &rarr;
          </span>
        </a>
      ) : (
        <p className="mt-4 text-sm text-text-secondary italic">Coming soon</p>
      )}
    </div>
  );
}
