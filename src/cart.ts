interface CartItem {
  readonly productId: number;
  readonly quantity: number;
}

export interface Cart {
  readonly id: number;
  readonly items: CartItem[];
}

let lastCartId: number = 0;
const openCarts: Record<string, Cart> = {};

const generateId = (): number => {
  lastCartId = lastCartId + 1;
  return lastCartId;
};

const getOrCreateCart = (cartId: number | undefined): Cart => cartId ? openCarts[cartId] : { id: generateId(), items: [] };

export const addProductToCart = async (cartId: number | undefined, productId: number, quantity: number): Promise<Cart> => {
  const cart = getOrCreateCart(cartId);
  const updatedCart: Cart = { ...cart, items: [...cart.items, { productId, quantity }] };

  openCarts[cart.id] = updatedCart;
  return updatedCart;
}

export const removeProuctToCart = async (cartId: number, productId: number): Promise<Cart> => {
  const cart = getOrCreateCart(cartId);
  const items = cart.items.filter((item: CartItem) => item.productId !== productId)
  const updatedCart: Cart = { ...cart, items };

  openCarts[cart.id] = updatedCart;
  return updatedCart;
}

export const updateItemQuantity = async (cartId: number, productId: number, quantity: number): Promise<Cart> => {
  const cart = getOrCreateCart(cartId);
  const items = cart.items.map((item: CartItem) => {
    return item.productId === productId ? { ...item, quantity } : item;
  });
  const updatedCart: Cart = { ...cart, items };

  openCarts[cart.id] = updatedCart;
  return updatedCart;
}

export const emptyCart = async (cartId: number): Promise<void> => {
  delete openCarts[cartId];
}

export const getOpenCarts = async (): Promise<Cart[]> => Object.values(openCarts);
