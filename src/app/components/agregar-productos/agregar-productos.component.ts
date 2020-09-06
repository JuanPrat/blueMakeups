import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.scss']
})
export class AgregarProductosComponent implements OnInit {
  formulario: FormGroup;
  files: File;
  constructor(private fb: FormBuilder, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  agregarProducto() {
    let files:any = document.getElementById("inpt-img");
    this.firebase.storeImg(files.files[0])
      .then(() => {
        this.firebase.getImg(files.files[0]).then(imgurl => {
          debugger
          this.firebase.agregarProducto({
            descripcion: this.formulario.controls["descripcion"].value,
            imgUrl: imgurl,
            nombre: this.formulario.controls["nombre"].value,
            id: "1",
            precio: this.formulario.controls["precio"].value
          })
        }
        );
      });
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      imagen: ["", Validators.required],
      nombre: ["", Validators.required],
      precio: ["", Validators.required],
      descripcion: ["", Validators.required]
    })
  }

}
