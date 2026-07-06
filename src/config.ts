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
  // Google Business Profile (from the shared Google listing).
  googleBusinessUrl: 'https://share.google/m8AJS7MYNogJLj8gu',
  // Facebook page.
  facebookUrl: 'https://www.facebook.com/share/1JCQwU1tSC/',
  // Opening hours — shown in LocalBusiness schema. Update if these change.
  hours: 'Mon–Sat 09:00–17:00',
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
  // Cape Town local delivery flat fee (ZAR).
  capeTownFee: 150,
  collectionSuburb: 'Ottery, Cape Town',
};

export type DeliveryOptionId = 'collection' | 'cape-town' | 'national';

export interface DeliveryOption {
  id: DeliveryOptionId;
  label: string;
  /** Flat fee in ZAR, or null when the cost is quoted separately. */
  fee: number | null;
  note: string;
  /** Whether this option needs a delivery address from the customer. */
  needsAddress: boolean;
}

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'collection',
    label: `Collect from ${delivery.collectionSuburb}`,
    fee: 0,
    note: 'Free — we arrange a pickup time with you.',
    needsAddress: false,
  },
  {
    id: 'cape-town',
    label: 'Cape Town local delivery',
    fee: delivery.capeTownFee,
    note: 'Flat fee for delivery within the Cape Town area.',
    needsAddress: true,
  },
  {
    id: 'national',
    label: 'National delivery — quote on request',
    fee: null,
    note: 'Cement is heavy and fragile, so we get you a courier quote before you pay. We contact you to confirm.',
    needsAddress: true,
  },
];

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
