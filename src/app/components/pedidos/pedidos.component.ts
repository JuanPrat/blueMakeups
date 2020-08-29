import { Component, OnInit } from '@angular/core';
import { carritoCompra } from 'src/app/models/carritoCompraModel';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos:Array<carritoCompra>;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  private obtenerPedidos(){
    this.firebase.leerPedidos()
    .subscribe((resp:Array<carritoCompra>) => this.pedidos = resp);
  }

}
