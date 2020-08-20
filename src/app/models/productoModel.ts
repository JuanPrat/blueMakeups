export class producto{
    id:string;
    nombre: string;
    precio: number;
    descripcion:string;
    imgUrl:string;
    cantidadEnCarrito:number;

    constructor(){
        this.id = this.id;
        this.descripcion = this.descripcion;
        this.precio = this.precio;
        this.nombre = this.nombre;
        this.imgUrl = this.imgUrl;
        this.cantidadEnCarrito = 0;
    }
}