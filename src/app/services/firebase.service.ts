import { Injectable } from '@angular/core';
import { producto } from '../models/productoModel';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db:AngularFirestore) { }

  agregarProductoCarrito(){
    this.db.collection('carritoDeCompras').add({
      nombre: 'Juan Jose',
      cargo: 'Desarrollador web Angular'
    });
  }

  leerProductos():Array<producto>{
    let productosList =  new Array();
    this.db.collection('productos').valueChanges()
    .subscribe((productos)=>{
      productosList = productos
      debugger
    });
    debugger
    return new Array();
  }
}

