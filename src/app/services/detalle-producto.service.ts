import { Injectable } from '@angular/core';
import { producto } from '../models/productoModel';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {
  producto: producto;

  constructor() { }
}
