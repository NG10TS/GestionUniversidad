import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { debounceTime } from 'rxjs';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  sem =[ ];

semFiltrado=[]; //LISTA ENCONTRADA
SemestreSelect; //VALOR SELECCIONADO
filtroSemestre=false; //ESTADO ngIf Lista

  SemestreSeleccionado = {
    id_sem:'',
    numero:'',
    desc_sem:'',
  };

  newSemestre= new FormGroup({

    // id_sem:new FormControl(''),
    numero:new FormControl(''),
    desc_sem:new FormControl('')
  });
  constructor(protected _sem:SemestreService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.iniciarFormfilterSemestre();
    this.CargarSemestre();

  }


  filterSemestreForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterSemestre(){ //ESTO SE DEBE LLAMAR
    this.filterSemestreForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.filtroSemestre=true;
      if(response && response.length){
        this.filterSemestre(response);
      } else {
        this.semFiltrado = [];
      }
      console.log('DATA ENCONTRADO', this.semFiltrado)
    })
  }

  filterSemestre(Datafilter){
    this.semFiltrado = this.sem.filter(a => a.desc_sem.indexOf(Datafilter) > -1)
  }

  SeleccionarSemestre(id,Modo){
    this._sem.SeleccionarSemestre(id)
    .then(res => {
      var a = res.data;
      this.SemestreSeleccionado = a;
      console.log('INFO SELECCIONADO',this.SemestreSeleccionado);
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
    console.log("err",err);
    });

  }
  MostrarMensaje(iconText,tittleText){
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: iconText, //success, info, error,warning,question
      title: tittleText
    })
  }
  CargarSemestre(){
    this._sem.ObtenerSemestres()
    .then(res => {
      console.log(res.data);
      this.sem = res.data;
      // this.semFiltrado = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
  }

  AgregarSemestre(){
    const formData = new FormData();
    // formData.append('id_sem',this.newSemestre.value.id_sem);
    formData.append('numero',this.newSemestre.value.numero);
    formData.append('desc_sem',this.newSemestre.value.desc_sem);
    this._sem.AgregarSemestre(formData)
    .then(res=>{
      this.MostrarMensaje('success','SE AÑADIO CORRECTAMENTE');
      console.log('SE AÑADIO CORRECTAMENTE',res.data);

      this.CargarSemestre();
    })
    .catch(error=>{
      this.MostrarMensaje('error','ERROR AL AÑADIR SEMESTRE');
      //console.log('ERROR AL AÑADIR Semestre');
      console.log(error);
    })
  }

  ModificarSemestre(Semestre){
    let data = {
      id_sem:Semestre.id_sem,
      numero:Semestre.numero,
      desc_sem:Semestre.desc_sem,
    };
    this._sem.ModificarSemestre(data, Semestre.id_sem)
    .then(res=>{
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE');
     // console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarSemestre();
    })
    .catch(error=>{
      this.MostrarMensaje('success','HAY ERROR AL MODIFICAR');
      //console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarSemestre();
    })
  }
  EliminarSemestre(id){
    this._sem.EliminarSemestre(id)
    .then(res => {
      console.log(res.data);
      this.CargarSemestre();
    }).catch(err =>  {
    console.log("err");
    });
  }

  LimpiarSemestres()
  {
  this.SemestreSeleccionado = {
    id_sem:'',
    numero:'',
    desc_sem:'',

  };
  this.newSemestre.patchValue({
    id_sem:'',
    numero:'',
    desc_sem:'',
  })
 }
}

