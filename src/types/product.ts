export interface IProduct {
  id_store?: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  minimum_stock_level: number;
}