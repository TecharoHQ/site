import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Techaro. All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Products
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
