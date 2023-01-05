import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { EstudiantedesercionService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/estudiantedesercion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estudiantedesercion',
  templateUrl: './estudiantedesercion.component.html',
  styleUrls: ['./estudiantedesercion.component.css']
})
export class EstudiantedesercionComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  estd=[];
  est=[];
  carre=[];

  newEstudiantedesercion = new FormGroup({

    // id_deser:new FormControl(''),
    tipo_deser:new FormControl(''),
    id_carre :new FormControl(''),
    causa_deser:new FormControl(''),
    id_est:new FormControl(''),

  });
  EstudiantedesercionSeleccionado = {
    id_deser :'',
    tipo_deser:'',
    id_carre :'',
    causa_deser:'',
    id_est :'',

  }
  constructor(protected _estDesercion: EstudiantedesercionService,
    protected _est: EstudiantesService, protected _carr: CarrerasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEstudiantedesercions();
    this.CargarEstudiantes();
    this.CargarCarrera();
  }
    CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  
  LimpiarEstudiantedesercions(){
    this.EstudiantedesercionSeleccionado = {
    id_deser :'',
    tipo_deser:'',
    id_carre :'',
    causa_deser:'',
    id_est :'',

    };
    this.newEstudiantedesercion.patchValue({
      id_deser :'',
      tipo_deser:'',
      id_carre :'',
      causa_deser:'',
      id_est :'',
    })
    }
  CargarEstudiantedesercions(){
    this._estDesercion.ObtenerEstudiantedesercions()
    .then(res => {
      console.log(res.data);
      this.estd = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarEstudiantedesercion(){
    const formData = new FormData();

    formData.append('tipo_deser',this.newEstudiantedesercion.value.tipo_deser);
    formData.append('id_carre',this.newEstudiantedesercion.value.id_carre);
    formData.append('causa_deser',this.newEstudiantedesercion.value.causa_deser);
    formData.append('id_est',this.newEstudiantedesercion.value.id_est);
    this._estDesercion.AgregarEstudiantedesercion(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')//ESTO SE AGREGA

      this.CargarEstudiantedesercions();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR DOCENTE');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')//Y ESTO TAMBIEN 

      console.log(error);
    })
  }

  SeleccionarEstudiantedesercion(id,Modo){
    this._estDesercion.SeleccionarEstudiantedesercion(id)
    .then(res => {
      var a = res.data;
      this.EstudiantedesercionSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.EstudiantedesercionSeleccionado);
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
  ModificarEstudiantedesercion(Estudiantedesercion){
    console.log('DATOS A ACTUALIZAR',Estudiantedesercion)
    const formData = new FormData();
    formData.append('id_deser',Estudiantedesercion.id_deser);
    formData.append('tipo_deser',Estudiantedesercion.tipo_deser);
    formData.append('id_carre',Estudiantedesercion.id_carre);
    formData.append('causa_deser',Estudiantedesercion.causa_deser);
    formData.append('id_est',Estudiantedesercion.id_est);

    this._estDesercion.ModificarEstudiantedesercion(formData,Estudiantedesercion.id_deser)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')

      console.log(res);
      this.CargarEstudiantedesercions();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')

      console.log(error);
      this.CargarEstudiantedesercions();
    })
  }
  EliminarEstudiantedesercion(id){



   Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR EL ESTUDIANTE?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText:'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',
    }).then((result) => {
      if (result.isConfirmed) {
           this._estDesercion.EliminarEstudiantedesercion(id)
    .then(res => {
      console.log(res.data);
      this.MostrarMensaje('success','ESTUDIANTE ELIMINADO SATISFACTORIAMENTE')
      this.CargarEstudiantedesercions();
    }).catch(err =>  {
    console.log("err");
    this.MostrarMensaje('error','NO SE PUDO ELIMINAR EL ESTUDIANTE')

    });
      }
    })


    
   
  }
  //ALERTAS
   MostrarMensaje(iconText,tittleText){//PARA AGREGAR
    var Toast = Swal.mixin({
      toast: true,
    //  position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: iconText, //success, info, error,warning,question
      title: tittleText
    })
  }
}
