export interface Product {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly availableQuantity: number;
}

const product_store: Product[] = [
  {
    id: 1,
    name: 'Cheetos',
    price: 1.99,
    availableQuantity: 1000
  },
  {
    id: 2,
    name: 'Cheese',
    price: 1.99,
    availableQuantity: 1000
  },
  {
    id: 3,
    name: 'Bread',
    price: 1.99,
    availableQuantity: 1000
  },
  {
    id: 4,
    name: 'Past',
    price: 1.99,
    availableQuantity: 1000
  },
  {
    id: 5,
    name: 'Icecream',
    price: 1.99,
    availableQuantity: 1000
  },
];

export const getAvailableProducts = async () => product_store;
