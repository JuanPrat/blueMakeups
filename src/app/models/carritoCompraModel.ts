import {producto} from './productoModel';

export class carritoCompra{
    clienteId:String;
    listaProductos:Array<producto>;

    constructor(){
        this.clienteId = this.clienteId;
        this.listaProductos = new Array<producto>();
    }
}