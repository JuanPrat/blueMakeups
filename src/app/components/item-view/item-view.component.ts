import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/models/productoModel';
import { ActivatedRoute } from '@angular/router';
import { DetalleProductoService } from 'src/app/services/detalle-producto.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  
  productoDetalle: producto;

  constructor(private detalle:DetalleProductoService, private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.productoDetalle = this.detalle.producto;
  }

  agregarAlCarrito(){
    debugger
    this.localStorage.agregarAlCarrito(this.detalle.producto);
  }

}
