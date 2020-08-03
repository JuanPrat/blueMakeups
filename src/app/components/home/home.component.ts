import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { producto } from 'src/app/models/productoModel';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: Array<producto> = new Array();


  constructor(private firebaseService:FirebaseService) {
    this.leerProductos();
   }

  ngOnInit(): void {
    
  }

  agregarAlCarrito(){ 
    this.firebaseService.agregarProductoCarrito()
  }

  leerProductos(){  
    this.productos = this.firebaseService.leerProductos();
  }

}
