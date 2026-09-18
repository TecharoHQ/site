// Shared schema.org nodes. Pages reference the organization by @id so each
// page does not repeat the full Organization object.

export const SITE = "https://techaro.lol";
export const ORG_ID = `${SITE}/#organization`;
export const ANUBIS_ID = `${SITE}/#anubis`;
export const BOTSTOPPER_ID = `${SITE}/#botstopper`;

export const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Techaro",
  url: SITE,
  logo: `${SITE}/img/logo_waffle.svg`,
  description:
    "Security software, AI consultancy, and custom software services.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Xe Iaso",
    sameAs: "https://www.wikidata.org/wiki/Q134301859",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@techaro.lol",
    url: `${SITE}/contact`,
    availableLanguage: "English",
  },
  knowsAbout: ["Bot Protection", "AI Consultancy", "Software Development"],
  sameAs: [
    "https://www.wikidata.org/wiki/Q134301803",
    "https://github.com/TecharoHQ",
    "https://www.linkedin.com/company/techaro/",
    "https://bsky.app/profile/techaro.lol",
  ],
};

export const anubis = {
  "@type": ["SoftwareApplication", "Product"],
  "@id": ANUBIS_ID,
  name: "Anubis",
  url: "https://anubis.techaro.lol",
  image: `${SITE}/img/anubis-happy.webp`,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Linux, macOS, Windows",
  description:
    "Open-source bot protection for the web that uses proof-of-work challenges to stop automated abuse.",
  brand: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    url: `${SITE}/pricing`,
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Free and open source. Self-hosted.",
  },
};

export const botstopper = {
  "@type": ["SoftwareApplication", "Product"],
  "@id": BOTSTOPPER_ID,
  name: "BotStopper",
  url: `${SITE}/products`,
  applicationCategory: "SecurityApplication",
  description:
    "Commercial bot protection built on Anubis, with enterprise features, managed deployment, and dedicated support.",
  brand: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  isBasedOn: { "@id": ANUBIS_ID },
  offers: {
    "@type": "Offer",
    url: `${SITE}/pricing`,
    price: "50.00",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
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
};

// BreadcrumbList for a page one level below the home page.
export function breadcrumbs(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
    ],
  };
}

// Wraps nodes in a single schema.org graph.
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
