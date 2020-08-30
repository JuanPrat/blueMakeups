import { Component, OnInit } from '@angular/core';
import { carritoCompra } from 'src/app/models/carritoCompraModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  public pedidos;
  public done:boolean = false;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  private obtenerPedidos(){
    this.firebase.leerPedidos()
    .subscribe((resp:Array<pedido>) =>{
       this.pedidos = resp;
       this.done = true;
       console.log(this.pedidos)
      });
  }

  despacharPedido(pedido:pedido){
    debugger
  }


}
