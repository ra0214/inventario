export interface Product {
  product_id?: number; 
  name: string; 
  description: string; 
  stock_boxes: number; 
  stock_individual: number; 
  deleted: boolean; 
  created_at: string; 
  created_by: string; 
  updated_at: string; 
  updated_by: string; 
}