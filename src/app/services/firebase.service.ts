import { Injectable } from '@angular/core';
import { producto } from '../models/productoModel';
import {carritoCompra} from '../models/carritoCompraModel'
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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
    debugger
    return this.db.collection('carritoDeCompra').doc(this.userUid).valueChanges();
  }

  logueo():Promise<firebase.auth.UserCredential>{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return firebase.auth().signInWithPopup(provider);
  }
}

