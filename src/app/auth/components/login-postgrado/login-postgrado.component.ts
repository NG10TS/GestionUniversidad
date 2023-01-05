import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InscritosProgramaService } from 'src/app/core/services/ACADEMICO/postgrado/inscritos-programa.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-login-postgrado',
  templateUrl: './login-postgrado.component.html',
  styleUrls: ['./login-postgrado.component.css']
})
export class LoginPostgradoComponent implements OnInit {

  constructor(protected _inscritosPrograma:InscritosProgramaService, protected _Tools:HerramientasService,private router: Router) { }

  ngOnInit(): void {
  }
  FormAutenticacion =new FormGroup({
    ci_ins:new FormControl(''),
    contrasenia:new FormControl(''),
  })
  autenticarEgresado(){
    let data={
      ci_ins:this.FormAutenticacion.value.ci_ins,
      contrasenia:this.FormAutenticacion.value.contrasenia
    }
    this._inscritosPrograma.AutenticarInscritosPrograma(data)
    .then(res=>{
      console.log(res.data)
      if (res.data.mensaje=='SUCCESS') {
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        localStorage.setItem('Tipo', 'Posgrante');
        this._Tools.MostrarMensaje('success','INICIO DE SESION CORRECTO')

        this.router.navigate(['/postgrado/Perfil']);
      }
      else{
        //NO EXISTE USUARIO
        this._Tools.MensajeInformacion('USUARIO O CONTRASEÑA INCORRECTOS','INTENTE NUEVAMENTE','error')
      }
    })
    .catch(error=>{
      this._Tools.MensajeInformacion('USUARIO O CONTRASEÑA INCORRECTOS','INTENTE NUEVAMENTE','error')
    })
  }
}
