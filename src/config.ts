/**
 * Central site configuration — edit business details, delivery and contact here.
 *
 * PUBLIC values only. Bank/EFT details are NOT kept here because this file is
 * bundled into public pages. EFT details live in an environment variable and are
 * only rendered on the private order-confirmation screen (see Phase 3).
 */

export const business = {
  name: 'Earthecho Designs',
  tagline: "Bringing Nature's Designs Home",
  framing:
    'Locally handcrafted cement garden features designed to bring natural elegance and timeless style to any indoor or outdoor space.',
  registration: '2025/496004/07',
  location: 'Ottery, Cape Town',
  email: 'Earthechodesigns@outlook.com',
  // Google Business Profile link — created after launch. Placeholder for now.
  googleBusinessUrl: '#',
};

export const contacts = {
  // Sindi Mhlophe — marketing / orders. This is the WhatsApp order number too.
  ordersName: 'Sindi Mhlophe',
  ordersPhoneDisplay: '079 680 6971',
  // International format for WhatsApp deep links (no +, no spaces).
  whatsappNumber: '27796806971',
  // Thabiso Masuku — production.
  productionName: 'Thabiso Masuku',
  productionPhoneDisplay: '074 966 1140',
};

export const delivery = {
  // Cape Town local delivery flat fee (ZAR). CONFIRM the exact amount with the owner.
  capeTownFee: 150,
  collectionSuburb: 'Ottery, Cape Town',
};

export const trustBadges = [
  'Locally Made',
  'Durable & Weather Resistant',
  'Indoor & Outdoor Use',
  'Drainage Holes Included',
  'Unique Handcrafted Designs',
];

export const productCategories = [
  'Statement',
  'Planters',
  'Bowls & Trays',
  'Garden Features',
] as const;

/** Build a WhatsApp deep link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${contacts.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
