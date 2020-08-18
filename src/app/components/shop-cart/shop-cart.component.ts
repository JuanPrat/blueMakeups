import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { carritoCompra } from 'src/app/models/carritoCompraModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { producto } from 'src/app/models/productoModel';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {
  carrito:carritoCompra = new carritoCompra();
  done = false;

  constructor(private firebaseService:FirebaseService, private localStorage:LocalStorageService) { }
  
  ngOnInit(): void {
    //this.carrito = JSON.parse(localStorage.getItem('carrito'));
    this.firebaseService.buscarCarritoCompra()
    .subscribe((productosEnCarrito:carritoCompra) => {
        this.carrito = productosEnCarrito;
      });
  }

  aumentarCantidad(producto:producto){
    this.localStorage.agregarAlCarrito(producto);
  }

  disminuirCantidad(producto:producto){
    this.localStorage.removerDelCarrito(producto);
  }

}
