import { Injectable } from '@angular/core';
import { producto } from '../models/productoModel';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db:AngularFirestore) { }

  agregarProductoCarrito(producto:producto){
    this.db.collection('carritoDeCompras').add(producto);
  }

  leerProductos(){
    return this.db.collection('productos').valueChanges();
  }

  buscarCarritoCompra(){
    return this.db.collection('carritoDeCompras').valueChanges();
  }
}

