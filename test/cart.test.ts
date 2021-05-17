import * as cartModule from '../src/cart';

const resetCarts = async () => {
  const openCarts = await cartModule.getOpenCarts();
  await Promise.all(openCarts.map(cart => cartModule.emptyCart(cart.id)));
};

describe('List open carts', () => {
  afterEach(resetCarts);

  it('Return an empty list for open carts', async () => {
    const openCarts = await cartModule.getOpenCarts();

    expect(openCarts).toStrictEqual([]);
  });

  it('Return an empty list for open carts', async () => {
    const expectedOpenCarts = [{
      id: 1,
      items: [{
        productId: 1,
        quantity: 1
      }]
    }, {
      id: 2,
      items: [{
        productId: 2,
        quantity: 1
      }]
    }, {
      id: 3,
      items: [{
        productId: 3,
        quantity: 1
      }]
    }];

    await cartModule.addProductToCart(undefined, 1, 1);
    await cartModule.addProductToCart(undefined, 2, 1);
    await cartModule.addProductToCart(undefined, 3, 1);

    const openCarts = await cartModule.getOpenCarts();

    expect(openCarts).toStrictEqual(expectedOpenCarts);
  });
});

describe('Add items in a cart', () => {
  afterEach(resetCarts);

  it('Create a cart if cartId is undefined', async () => {
    const cart = await cartModule.addProductToCart(undefined, 3, 1)
    const expectedItems = [{
      productId: 3,
      quantity: 1
    }]

    expect(cart.id).toBeGreaterThan(0);
    expect(cart.items).toStrictEqual(expectedItems);
  });

  it('Add items to an existing cart', async () => {
    const cart = await cartModule.addProductToCart(undefined, 3, 1)
    const expectedItems = [{
      productId: 3,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 3
    }]

    const updatedCart = await cartModule.addProductToCart(cart.id, 2, 3)

    expect(updatedCart.items).toStrictEqual(expectedItems);
  });
});

describe('Manipulate items in a cart', () => {
  let cart;

  beforeEach(async () => {
    cart = await cartModule.addProductToCart(undefined, 3, 1);
  });

  afterEach(resetCarts);

  it('Update number of an item quantity in cart', async () => {
    const expectedItems = [{
      productId: 3,
      quantity: 9
    }]

    const updatedCart = await cartModule.updateItemQuantity(cart.id, 3, 9)

    expect(updatedCart.items).toStrictEqual(expectedItems);
  });

  it('Delete an item from a cart', async () => {
    const expectedItems = []

    const updatedCart = await cartModule.removeProuctToCart(cart.id, 3);

    expect(updatedCart.items).toStrictEqual(expectedItems);
  });
});

describe('Delete an entire cart', () => {
  afterEach(resetCarts);

  it('Remove cart from open carts list', async () => {
    const cart = await cartModule.addProductToCart(undefined, 3, 1);

    await cartModule.emptyCart(cart.id);
    const openCarts = await cartModule.getOpenCarts();

    expect(openCarts).toStrictEqual([]);
  });
});
