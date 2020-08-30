import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  @ViewChild('nombreUsuario', {static: true}) nombreUsuarioLogin:ElementRef;
  @ViewChild('imgUsuario', {static: true}) imgUsuario:ElementRef;
  
  constructor(private firebaseServ:FirebaseService) { }

  ngOnInit(): void {
    
  }

  loguear(){
    this.firebaseServ.logueo().then((result) => {
      debugger
      document.getElementById("usrImg").style.display = "inline";  
      var user = result.user;
      this.nombreUsuarioLogin.nativeElement.innerText = user.displayName;
      this.imgUsuario.nativeElement.src = user.photoURL
      this.firebaseServ.userUid = user.uid;
      this.firebaseServ.nombreUsuarioLogin = user.displayName;
      document.getElementById("login").style.display = "none";
      if(result.additionalUserInfo.profile.email == "drea15na@gmail.com" || result.additionalUserInfo.profile.email == "juanprat96@gmail.com" ){
        document.getElementById("pedidos").style.display = "inline";
      }
    }).catch(error =>console.log(error));
  }
}
