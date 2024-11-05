import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit {
  products: Product[] = []; 
  selectedProduct: Product | null = null; 
  productForm: FormGroup; 

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock_boxes: [0, [Validators.required, Validators.min(0)]],
      stock_individual: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8000/api/product') 
      .subscribe(
        (data) => {
          this.products = data; 
        },
        (error) => {
          console.error('Error al cargar productos:', error); 
        }
      );
  }

  editProduct(product: Product): void {
    this.selectedProduct = product; 
    this.productForm.patchValue(product); 
  }

  
  updateProduct(): void {
    if (this.productForm.valid && this.selectedProduct) {
      const updatedProduct: Product = {
        ...this.productForm.value,
        product_id: this.selectedProduct.product_id,
      };

      this.http.put(`http://localhost:8000/api/product/${this.selectedProduct.product_id}`, updatedProduct)
        .subscribe(() => {
          console.log('Producto actualizado:', updatedProduct);
          
          Swal.fire({
            title: 'Éxito!',
            text: 'El producto ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.loadProducts(); 
          this.selectedProduct = null; 
          this.productForm.reset();
        }, (error) => {
          console.error('Error al actualizar el producto:', error); 
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrió un problema al actualizar el producto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  }
}
