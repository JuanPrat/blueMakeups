import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { producto } from 'src/app/models/productoModel';
import { DetalleProductoService } from '../../services/detalle-producto.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: Array<producto> = new Array();
  done: boolean = false;


  constructor(
    private firebaseService: FirebaseService,
    private ruta: Router,
    private detalleService: DetalleProductoService,
    private localStorageService: LocalStorageService) {
    if (localStorage.getItem('nyan') !== "showed" || localStorage.getItem('nyan') == undefined) {
      Swal.fire({
        title: '<span style="color:#FFFFFF"><Strong>Bienvenidos a Blue Makeups</Strong></span>',
        width: 400,
        padding: '3em',
        background: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00-1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNjc0MDE5NDUtMzRmYy00NmI4LThlOGYtMTk4Mjg0NzI3N2Q0XC9kZGJhMjJiLTJmYWQ5ZDAwLTFkM2YtNGVjOC1hNjVkLTE5OWEwOWRmYTRlMS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ._-whxwEBEaTLWUvSWL80KTGiwpoy9dSPzXSRhfTAzeM)',
        confirmButtonText:
          'Gracias!',
      })
      localStorage.setItem('nyan', "showed")
    }

  }

  ngOnInit(): void {
    this.leerProductos();
  }

  agregarAlCarrito(producto: producto) {
    this.localStorageService.agregarAlCarrito(producto);
  }

  leerProductos() {
    this.firebaseService.leerProductos()
      .subscribe((productos: Array<producto>) => {
        this.productos = productos;
        this.productos.forEach(prod => prod.cantidadEnCarrito = 1)
        this.done = true;
      });
  }

  verDetalle(producto: producto) {
    this.detalleService.producto = producto;
    this.ruta.navigate(['itemView']);
  }

}
