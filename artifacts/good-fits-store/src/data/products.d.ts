export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  status: string;
  label: string;
  description: string;
};

export declare const products: CatalogProduct[];
export declare const categories: string[];