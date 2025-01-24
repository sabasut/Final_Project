import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
    {path : 'home', component : HomeComponent},
    {path: 'product/:id' , component : ProductDetailsComponent},
    {path: 'cart', component : CartComponent},
    {path: 'admin', component : AdminComponent},
    {path: '', component : AuthComponent},

    {path: '**', redirectTo : ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
  })
  export class AppRoutingModule { }
