import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { EstudianteabandonoService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/estudianteabandono.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-Estudianteabandono',
  templateUrl: './Estudianteabandono.component.html',
  styleUrls: ['./Estudianteabandono.component.css']
})
export class EstudianteabandonoComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  esta=[];
  est=[];
  carre=[];
  //Para Validaciones
  // @ViewChild('InputFoto') InputFoto: ElementRef;
  // Mensaje;

  newEstudianteabandono = new FormGroup({

  // id_aband:new FormControl(''),
  tipo_aband :new FormControl(''),
  causa_aband :new FormControl(''),
  id_est :new FormControl(''),
  id_carre :new FormControl(''),

  });

  EstudianteabandonoSeleccionado = {
      id_aband:'',
      tipo_aband: '',
      causa_aband :'',
      id_est :'',
      id_carre :'',

  }
  constructor(protected _estAband: EstudianteabandonoService,
    protected _est: EstudiantesService, protected _carr:CarrerasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEstudianteabandono();
    this.CargarEstudiantes();
    this.CargarCarrera();
  }

  LimpiarEstudianteabandono(){
    this.EstudianteabandonoSeleccionado = {
      id_aband:'',
      tipo_aband: '',
      causa_aband :'',
      id_est :'',
      id_carre :'',

    };
    this.newEstudianteabandono.patchValue({
      // id_aband:'',
      tipo_aband: '',
      causa_aband :'',
      id_est :'',
      id_carre :'',

    })

  }

  CargarEstudianteabandono(){
    this._estAband.ObtenerEstudianteabandonos()
    .then(res => {
      console.log(res.data);
      this.esta = res.data;
    }).catch(err =>  {
    console.log("err");
    });
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
  AgregarEstudianteabandono(){
    let data = {
      //  id_aband:this.newEstudianteabandono.value.id_aband,
      tipo_aband:this.newEstudianteabandono.value.tipo_aband,
      causa_aband: this.newEstudianteabandono.value.causa_aband,
      id_est :this.newEstudianteabandono.value.id_est,
      id_carre :this.newEstudianteabandono.value.id_carre,
      // foto_est:this.newEstudianteabandono.value.foto_est,
      // tel_dom_est:this.newEstudianteabandono.value.tel_dom_est,
    };
    this._estAband.AgregarEstudianteabandono(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')
      console.log(result);
      this.CargarEstudianteabandono();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')
      console.log(error);
      this.CargarEstudianteabandono();
    });
  }


  SeleccionarEstudianteabandono(id,Modo){
    // Estudianteabandonoseleccionado=a;
    this._estAband.SeleccionarEstudianteabandono(id)
    .then(res => {
      var a = res.data;
      this.EstudianteabandonoSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.EstudianteabandonoSeleccionado);
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
  ModificarEstudianteabandono(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {

        id_aband:dato.id_aband,
        tipo_aband:dato.tipo_aband,
        causa_aband:dato.causa_aband,
        id_est:dato.id_est,
        id_carre:dato.id_carre,

    };
    this._estAband.ModificarEstudianteabandono(data, dato.id_aband)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')
      this.CargarEstudianteabandono();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')
      console.log(error);
      this.CargarEstudianteabandono();
    });
  }
  EliminarEstudianteabandono(id){
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
      this._estAband.EliminarEstudianteabandono(id)
      .then(res => {
      console.log(res.data);
      this.MostrarMensaje('success','ESTUDIANTE ELIMINADO SATISFACTORIAMENTE')
      this.CargarEstudianteabandono();
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

