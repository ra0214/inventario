import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-delete-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './delete-admin.component.html',
  styleUrl: './delete-admin.component.css'
})
export class DeleteAdminComponent implements OnInit {
  products: Product[] = []; 
  selectedProductIds: number[] = []; 

  constructor(private http: HttpClient) {}

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

  deleteSelectedProducts(): void {
    if (this.selectedProductIds.length > 0) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar estos productos después de eliminarlos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.selectedProductIds.forEach(productId => {
            this.http.delete(`http://localhost:8000/api/product/${productId}`) 
              .subscribe(() => {
                console.log('Producto eliminado:', productId);
                
                Swal.fire({
                  title: '¡Eliminado!',
                  text: 'El producto ha sido eliminado correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.loadProducts(); 
              }, error => {
                console.error('Error al eliminar producto:', error);
                Swal.fire({
                  title: 'Error',
                  text: 'Ocurrió un problema al eliminar el producto.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              });
          });
          this.selectedProductIds = []; 
        }
      });
    } else {
      Swal.fire({
        title: 'Sin selección',
        text: 'Por favor, selecciona al menos un producto para eliminar.',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onSelectChange(productId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedProductIds.push(productId);
    } else {
      this.selectedProductIds = this.selectedProductIds.filter(id => id !== productId);
    }
  }
}
