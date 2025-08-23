import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canMatch: [authGuard],                 // 👈 no carga si no pasa
    data: { roles: ['admin'] },
    loadComponent: () => import('./admin/admin').then(c => c.AdminComponent),
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Ruta por defecto para /admin
      // { path: 'users', loadComponent: () => import('./admin/users.component').then(m => m.UsersComponent) },
      // { path: 'settings', loadComponent: () => import('./admin/settings.component').then(m => m.SettingsComponent) },
      { path: '**', redirectTo: '' } // Redirige cualquier ruta hija inexistente a la ruta vacía (se queda en /admin)
    ]
  },
  // {
  //   path: 'products',
    // loadComponent: () =>
    //   import('./products/products.component').then(m => m.ProductsComponent), LazyLoad
  // },
  // { 
  //   path: 'products/:id',
  //   loadComponent: () =>
  //     import('./products/product-detail.component').then(m => m.ProductDetailComponent)
  // },
  { path: '**', redirectTo: '' } // fallback
];
