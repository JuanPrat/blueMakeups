import { Injectable } from '@angular/core';
import {carritoCompra} from '../models/carritoCompraModel'
import {pedido} from '../models/pedido';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  nombreUsuarioLogin: any;
  imgUsuario: any;
  userUid:string;

  constructor(private db:AngularFirestore) { 
    
  }

  guardarCarrito(carritoLocalStorage:carritoCompra){
    debugger
        this.db.collection('carritoDeCompra').doc(this.userUid).set({
          clienteId: this.userUid,
          listaProductos: carritoLocalStorage.listaProductos
        }, {merge:true});
  };

  leerProductos(){
    return this.db.collection('productos').valueChanges();
  }
  
  buscarCarritoCompra(){
    return this.db.collection('carritoDeCompra').doc(this.userUid).valueChanges();
  }

  leerPedidos(){
    return this.db.collection('pedidos').valueChanges();
  }

  logueo():Promise<firebase.auth.UserCredential>{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return firebase.auth().signInWithPopup(provider);
  }

  ordenarPedido(carrito:carritoCompra, direccion:string, celular:string){
    let pedido:pedido = {
      carrito: carrito, 
      direccion: direccion,
      celular: celular,
      cliente: this.nombreUsuarioLogin
    }
    this.db.collection('pedidos').add({pedido}).then(result => {
      Swal.fire('Pedido enviado exitosamente. BlueMakeups se pondrá en contacto contigo');
    });
    localStorage.removeItem('carrito');
    this.db.collection('carritoDeCompra').doc(this.userUid).delete();
  }
}

