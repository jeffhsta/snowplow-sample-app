import { buildStructEvent, Tracker } from "@snowplow/node-tracker";
import { Router, Request, Response } from 'express';
import * as cartModule from './cart';
import { getAvailableProducts } from './product';

export default (tracker: Tracker): Router => {
  const router = Router();

  router.get('/', async (_req: Request, res: Response): Promise<void> => {
    tracker.track(buildStructEvent({
      category: "application-status",
      action: "health-check"
    }));

    res.status(200).json({
      message: 'Application healthy'
    });
  });

  router.get('/products', async (_req: Request, res: Response): Promise<void> => {
    const products = await getAvailableProducts();

    tracker.track(buildStructEvent({
      category: "shop",
      action: "list-products",
      property: "products.lenght",
      value: products.length
    }));

    res.status(200).json({
      products
    });
  });

  router.put('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
    const cartId = isNaN(parseInt(req.params.cartId)) ? undefined : parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity || '1');

    const cart = await cartModule.addProductToCart(cartId, productId, quantity);

    tracker.track(buildStructEvent({
      category: "shop",
      action: "add-cart-item",
      property: "cart.items.length",
      value: cart.items.length
    }));

    res.status(200).json({
      cart
    });
  });

  router.patch('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity || '0');

    const cart = await cartModule.updateItemQuantity(cartId, productId, quantity);

    tracker.track(buildStructEvent({
      category: "shop",
      action: "update-cart-item",
      property: "product.quantity",
      value: quantity
    }));

    res.status(200).json({
      cart
    });
  });

  router.delete('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
    const cartId = parseInt(req.params.cartId);
    const productId = parseInt(req.params.productId);

    const cart = await cartModule.removeProuctToCart(cartId, productId);

    tracker.track(buildStructEvent({
      category: "shop",
      action: "remove-cart-item",
      property: "cart.items.length",
      value: cart.items.length
    }));

    res.status(200).json({
      cart
    });
  });

  router.delete('/cart/:cartId', async (req: Request, res: Response): Promise<void> => {
    const cartId = parseInt(req.params.cartId);
    await cartModule.emptyCart(cartId);

    tracker.track(buildStructEvent({
      category: "shop",
      action: "empty-cart"
    }));

    res.status(204).json({});
  });

  return router;
};
