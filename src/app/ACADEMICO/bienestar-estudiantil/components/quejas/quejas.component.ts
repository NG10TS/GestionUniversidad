import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { QuejasService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/quejas.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-quejas',
  templateUrl: './quejas.component.html',
  styleUrls: ['./quejas.component.css']
})
export class QuejasComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  fac=[];
  est=[];
  carre=[];

  newQuejas = new FormGroup({

    // id_queja:new FormControl(''),
    tipo_queja:new FormControl(''),
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
    estado_sol:new FormControl(''),
    motivo_sol:new FormControl(''),
    fec_queja:new FormControl(''),
    fec_sol:new FormControl(''),
  });
  QuejasSeleccionado = {

    id_queja:'',
    tipo_queja:'',
    id_est:'',
    id_carre:'',
    estado_sol:'',
    motivo_sol:'',
    fec_queja:'',
    fec_sol:'',
    NombreCompleto:'',
    nombre_carre:'',

  }
  constructor(protected _quejas: QuejasService,
    protected _est: EstudiantesService,protected _carr:CarrerasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarQuejas();
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
  LimpiarQuejas(){
    this.QuejasSeleccionado = {
      id_queja:'',
      tipo_queja:'',
      id_est:'',
      id_carre:'',
      estado_sol:'',
      motivo_sol:'',
      fec_queja:'',
      fec_sol:'',
      NombreCompleto:'',
      nombre_carre:'',

    };
    this.newQuejas.patchValue({
      // id_queja:'',
      tipo_queja:'',
      id_est:'',
      id_carre:'',
      estado_sol:'',
      motivo_sol:'',
      fec_queja:'',
      fec_sol:'',
      NombreCompleto:'',
      nombre_carre:'',

    })
  }
  CargarQuejas(){
    this._quejas.ObtenerQuejass()
    .then(res => {
      console.log(res.data);
      this.fac = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarQuejas(){
    const formData = new FormData();
    formData.append('tipo_queja',this.newQuejas.value.tipo_queja);
    formData.append('id_est',this.newQuejas.value.id_est);
    formData.append('id_carre',this.newQuejas.value.id_carre);
    formData.append('estado_sol',this.newQuejas.value.estado_sol);
    this._quejas.AgregarQuejas(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')
      this.CargarQuejas();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')
      console.log(error);
    })
  }

  SeleccionarQuejas(id,Modo){
    this._quejas.SeleccionarQuejas(id)
    .then(res => {
      var a = res.data;
      this.QuejasSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.QuejasSeleccionado);
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
  ModificarQuejas(Quejas){
    console.log('DATOS A ACTUALIZAR',Quejas)
    const formData = new FormData();
    formData.append('id_queja',Quejas.id_queja);
    formData.append('tipo_queja',Quejas.tipo_queja);
    formData.append('id_est',Quejas.id_est);
    formData.append('id_carre',Quejas.id_carre);
    formData.append('estado_sol',Quejas.estado_sol);
    this._quejas.ModificarQuejas(formData,Quejas.id_queja)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')
      console.log(res);
      this.CargarQuejas();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')
      console.log(error);
      this.CargarQuejas();
    })
  }
  EliminarQuejas(id){
    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR LA QUEJA?',
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
      this._quejas.EliminarQuejas(id)
      .then(res => {
      console.log(res.data);
      this.MostrarMensaje('success','QUEJA ELIMINADO SATISFACTORIAMENTE')
      this.CargarQuejas();
      }).catch(err =>  {
      console.log("err");
      this.MostrarMensaje('error','NO SE PUDO ELIMINAR LA QUEJA')
      });
      }
    })
  }
  //ALERTAS
   MostrarMensaje(iconText,tittleText){
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

