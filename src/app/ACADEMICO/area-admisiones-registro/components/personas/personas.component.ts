import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { PersonasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  per=[];
  // Num1 =1;
  // Num2=0;

  newPersona = new FormGroup({
    // id_persona:new FormControl(''),
    ape_p_per:new FormControl(''),
    ape_m_per:new FormControl(''),
    nombre_per:new FormControl(''),
    ci_per:new FormControl(''),
    cel_per:new FormControl(''),
    dir_per:new FormControl(''),
    email_per:new FormControl(''),
    id_empresa:new FormControl(''),
    nit_persona:new FormControl(''),
  });
  PersonaSeleccionado = {
    id_persona:'',
    ape_p_per:'',
    ape_m_per:'',
    nombre_per:'',
    ci_per:'',
    cel_per:'',
    dir_per:'',
    email_per:'',
    id_empresa:'',
    nit_persona:'',
  }
  constructor(protected _persona: PersonasService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarPersonas();
  }
  LimpiarPersonas(){
    this.PersonaSeleccionado = {
      id_persona:'',
      ape_p_per:'',
      ape_m_per:'',
      nombre_per:'',
      ci_per:'',
      cel_per:'',
      dir_per:'',
      email_per:'',
      id_empresa:'',
      nit_persona:'',
    };
    this.newPersona.patchValue({
      id_persona:'',
      ape_p_per:'',
      ape_m_per:'',
      nombre_per:'',
      ci_per:'',
      cel_per:'',
      dir_per:'',
      email_per:'',
      id_empresa:'',
      nit_persona:'',
    })
   }

  CargarPersonas(){
    this._persona.ObtenerPersonas()
    .then(res => {
      console.log(res.data);
      this.per = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarPersona(){
      const formData = new FormData();

      // formData.append('id_persona:',this.newPersona.value.ubica_facu);
      formData.append('ape_p_per',this.newPersona.value.ape_p_per);
      formData.append('ape_m_per',this.newPersona.value.ape_m_per);
      formData.append('nombre_per',this.newPersona.value.nombre_per);
      formData.append('ci_per',this.newPersona.value.ci_per);
      formData.append('cel_per',this.newPersona.value.cel_per);
      formData.append('dir_per',this.newPersona.value.dir_per);
      formData.append('email_per',this.newPersona.value.email_per);
      formData.append('id_empresa',this.newPersona.value.id_empresa);
      formData.append('nit_persona',this.newPersona.value.nit_persona);
      this._persona.AgregarPersona(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarPersonas();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error);
      })
  }

  SeleccionarPersona(id,Modo){
    this._persona.SeleccionarPersona(id)
    .then(res => {
      var a = res.data;
      this.PersonaSeleccionado = a;
      console.log('INFO PER SELECCIONADO',this.PersonaSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalMod").click();
          break;
        case 'Mostrar':
          document.getElementById("btnOpenModalMos").click();
          break;
        default:
          break;
      }
    }).catch(err =>  {
    console.log("err");
    });

  }
  ModificarPersona(Persona){
    console.log('DATOS A ACTUALIZAR',Persona)
    const formData = new FormData();
    formData.append('id_persona',Persona.id_persona);
    formData.append('ape_p_per',Persona.ape_p_per);
    formData.append('ape_m_per',Persona.ape_m_per);
    formData.append('nombre_per',Persona.nombre_per);
    formData.append('ci_per',Persona.ci_per);
    formData.append('cel_per',Persona.cel_per);
    formData.append('dir_per',Persona.dir_per);
    formData.append('email_per',Persona.email_per);
    formData.append('id_empresa',Persona.id_empresa);
    formData.append('nit_persona',Persona.nit_persona);
    this._persona.ModificarPersona(formData, Persona.id_persona)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarPersonas();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarPersonas();
    })
  }
  EliminarPersona(id){
    this._persona.EliminarPersona(id)
    .then(res => {
      console.log(res.data);
      this.CargarPersonas();
    }).catch(err =>  {
    console.log("err");
    });
  }
}
