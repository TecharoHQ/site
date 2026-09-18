import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Techaro. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center gap-6">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
