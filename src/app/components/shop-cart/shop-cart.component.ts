import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { producto } from 'src/app/models/productoModel';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  carrito:Array<producto> = new Array<producto>();

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.buscarCarritoCompra()
    .subscribe((productosEnCarrito:Array<producto>) => this.carrito = productosEnCarrito);
  }

}
