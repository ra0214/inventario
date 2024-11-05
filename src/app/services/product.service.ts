import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/product/'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product_id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product_id}`, product);
  }

  deleteProduct(product_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${product_id}`);
  }
}
