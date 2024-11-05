import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = {
    name: '',
    description: '',
    stock_boxes: 0,
    stock_individual: 0,
    deleted: false,
    created_at: '',
    created_by: 'admin',
    updated_at: '',
    updated_by: 'admin'
  };

  private apiUrl = 'http://localhost:8000/api/product';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.product.created_at = new Date().toISOString().split('T')[0]; // Obtener la fecha actual
    this.product.updated_at = new Date().toISOString().split('T')[0]; // Obtener la fecha actual

    this.http.post<Product>(this.apiUrl, this.product)
      .subscribe(
        response => {
          console.log('Producto agregado:', response);
          
          Swal.fire({
            title: '¡Producto Agregado!',
            text: `Se ha agregado el producto: ${this.product.name}\nStock en Cajas: ${this.product.stock_boxes}\nStock Individual: ${this.product.stock_individual}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.resetForm();
        },
        error => {
          console.error('Error al agregar producto:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al agregar el producto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
  }

  resetForm(): void {
    this.product = {
      name: '',
      description: '',
      stock_boxes: 0,
      stock_individual: 0,
      deleted: false,
      created_at: '',
      created_by: 'admin',
      updated_at: '',
      updated_by: 'admin'
    };
  }
}
