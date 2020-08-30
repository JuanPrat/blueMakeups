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
    this.firebase.storeImg(document.getElementById("inpt-img").files[0])
      .then(uploaded => {
        debugger
        this.firebase.agregarProducto({
          descripcion: this.formulario.controls["descripcion"].value,
          imgUrl: "https://firebasestorage.googleapis.com/v0/b/bluemakeups-e2a4a.appspot.com/o/Productos%2F" + this.formulario.controls["imagen"] + "?alt=media&token=a36b3855-5b7b-445c-a056-ea1a2646cf4b",
          nombre: this.formulario.controls["nombre"].value,
          id: "1",
          precio: this.formulario["precio"].value
        })
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
