import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AgregarProductosComponent } from './components/agregar-productos/agregar-productos.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"shopCart", component:ShopCartComponent},
  {path:"itemView", component:ItemViewComponent},
  {path:"pedidos", component:PedidosComponent},
  {path:"agregarProductos", component:AgregarProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
