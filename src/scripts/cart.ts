/**
 * Earthecho cart — a tiny client-side cart backed by localStorage.
 * No framework, no server. Every change dispatches a `CART_EVENT` on window
 * so the header badge and cart page can react.
 */

export interface CartItem {
  code: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

const KEY = 'earthecho_cart_v1';
export const CART_EVENT = 'earthecho:cart-changed';

function read(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) => i && typeof i.code === 'string' && typeof i.price === 'number',
    );
  } catch {
    return [];
  }
}

function write(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function getCart(): CartItem[] {
  return read();
}

export function addItem(item: Omit<CartItem, 'qty'>, qty = 1): void {
  const items = read();
  const existing = items.find((i) => i.code === item.code);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...item, qty: Math.max(1, qty) });
  }
  write(items);
}

export function updateQty(code: string, qty: number): void {
  let items = read();
  if (qty <= 0) {
    items = items.filter((i) => i.code !== code);
  } else {
    const item = items.find((i) => i.code === code);
    if (item) item.qty = qty;
  }
  write(items);
}

export function removeItem(code: string): void {
  write(read().filter((i) => i.code !== code));
}

export function clearCart(): void {
  write([]);
}

export function count(): number {
  return read().reduce((n, i) => n + i.qty, 0);
}

export function subtotal(): number {
  return read().reduce((sum, i) => sum + i.price * i.qty, 0);
}

/** Subscribe to cart changes; returns an unsubscribe function. */
export function onCartChange(cb: () => void): () => void {
  window.addEventListener(CART_EVENT, cb);
  // Sync across tabs.
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CART_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
