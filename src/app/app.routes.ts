import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DeleteAdminComponent } from './components/delete-admin/delete-admin.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'delete-product', component: DeleteProductComponent }
  ]},
  { path: 'dashboard-admin', component: DashboardAdminComponent, children: [
    { path: 'products-admin', component: ProductAdminComponent },
    { path: 'delete-product-admin', component: DeleteAdminComponent }
]},
]