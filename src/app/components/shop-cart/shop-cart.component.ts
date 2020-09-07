import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { carritoCompra } from 'src/app/models/carritoCompraModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { producto } from 'src/app/models/productoModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {
  carrito:carritoCompra = new carritoCompra();
  formulario:FormGroup;
  done = false;
  carritoVacio = true;

  constructor(private firebaseService:FirebaseService,
     private localStorage:LocalStorageService,
     private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.formularioModal();
    this.firebaseService.buscarCarritoCompra()
    .subscribe((productosEnCarrito:carritoCompra) => {
      debugger
        this.carrito = productosEnCarrito;
        this.carritoVacio = this.carrito.listaProductos == undefined ? true : false;
      });      
  }

  formularioModal(){
    this.formulario = this.fb.group({
      direccion:['', Validators.required],
      celular:['', Validators.required]
    })
  }

  aumentarCantidad(producto:producto){
    this.localStorage.agregarAlCarrito(producto);
  }

  disminuirCantidad(producto:producto){
    this.localStorage.removerDelCarrito(producto);
  }

  ordenarPedido(){
    debugger
    const direccion = this.formulario.controls['direccion'].value;
    const celular = this.formulario.controls['celular'].value
    this.firebaseService.ordenarPedido(this.carrito, direccion, celular );
  }
}
