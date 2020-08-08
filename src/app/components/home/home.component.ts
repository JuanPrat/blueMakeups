import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { producto } from 'src/app/models/productoModel';
import { DetalleProductoService } from '../../services/detalle-producto.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: Array<producto> = new Array();
  done:boolean = false;

  constructor(
    private firebaseService:FirebaseService,
    private ruta:Router,
    private detalleService:DetalleProductoService) {}

  ngOnInit(): void {
    this.leerProductos();
  }

  agregarAlCarrito(producto:producto){ 
    this.firebaseService.agregarProductoCarrito(producto);
  }

  leerProductos(){  
    this.firebaseService.leerProductos()
    .subscribe((productos:Array<producto>) => {
      this.productos = productos;
      this.done = true;
    });   
  }

  verDetalle(producto:producto){
    this.detalleService.producto = producto;
    this.ruta.navigate(['itemView']);
  }

}
