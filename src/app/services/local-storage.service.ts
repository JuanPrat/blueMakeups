import { Injectable } from '@angular/core';
import { producto } from '../models/productoModel';
import { carritoCompra } from '../models/carritoCompraModel';
import { FirebaseService } from './firebase.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  carrito:carritoCompra;

  constructor(private firebase:FirebaseService) { }

  agregarAlCarrito(producto:producto){
    this.firebase.userUid == undefined ? 
    Swal.fire({
      icon:'error',
      title: 'Por favor inicia sesión antes de añadir productos al carrito',
    })
    : 
    this.carrito = localStorage.getItem('carrito') == undefined ? 
    new carritoCompra() : JSON.parse(localStorage.getItem('carrito'));
    let cantidad = this.obtenerCantidadProductoEnCarrito(producto);
    cantidad === undefined ? this.carrito.listaProductos.push(producto) : this.aumentarCantidad(producto, cantidad)
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
    this.firebase.guardarCarrito(this.carrito);
    Swal.fire({
      icon:'success',
      title: 'Producto añadido al carrito',
    })
  }

  removerDelCarrito(producto:producto){
    this.carrito = JSON.parse(localStorage.getItem('carrito'));
    this.carrito.listaProductos.forEach((prod) => {
      if(prod.id == producto.id){
        prod.cantidadEnCarrito == 1 ? this.carrito.listaProductos = this.eliminarProducto(this.carrito.listaProductos, prod.id) : prod.cantidadEnCarrito -= 1;
      }
    })
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.firebase.guardarCarrito(this.carrito);
  }

  eliminarProducto(productos:Array<producto>, id){
    return productos.filter(prod => prod.id !== id);
  }

  obtenerCantidadProductoEnCarrito(producto:producto){
    return this.carrito.listaProductos.filter(prod=>prod.id == producto.id).map(prod => prod.cantidadEnCarrito)[0];
  }

  aumentarCantidad(producto:producto, cantidad:number){
    debugger
    return this.carrito.listaProductos.map(prod => {prod.id === producto.id ? prod.cantidadEnCarrito = cantidad +1 : ""})
  }
  
}
