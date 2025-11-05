// utils/cart.ts

export interface GuestCartItem {
  productId: number;
  title: string;
  pricePerM2: number;
  image: string;
  quantity: number;
  m2?: number;
  width?: number;
  height?: number;
  profile?: string;
  device?: string;
  note?: string; // ⚠️ null değil, sadece undefined olabilir
}
const CART_KEY = "guestCart";

export const getCart = (): GuestCartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveCart = (cart: GuestCartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const addToGuestCart = (
  product: Omit<GuestCartItem, "quantity">,
  quantity = 1
) => {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === product.productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
};

export const updateGuestCartQuantity = (productId: number, delta: number) => {
  const cart = getCart();
  const item = cart.find((c) => c.productId === productId);
  if (item) item.quantity = Math.max(1, item.quantity + delta);
  saveCart(cart);
};

export const removeFromGuestCart = (productId: number) => {
  const newCart = getCart().filter((c) => c.productId !== productId);
  saveCart(newCart);
};

export const getGuestCartCount = (): number => {
  if (typeof window === "undefined") return 0;
  const data = localStorage.getItem("guestCart");
  if (!data) return 0;
  try {
    const items = JSON.parse(data);
    return items.length || 0;
  } catch {
    return 0;
  }
};

export const clearGuestCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};
