import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';
import { CalendariosService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/Calendarios.service';
import { CronogramasService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/Cronogramas.service';

@Component({
  selector: 'app-calendarios',
  templateUrl: './calendarios.component.html',
  styleUrls: ['./calendarios.component.css']
})
export class CalendariosComponent implements OnInit {

  constructor( protected _calend:CalendariosService, protected _carr: CarrerasService, protected _sem: SemestreService, protected _mat:MateriasService, protected _crono:CronogramasService ) { }

  ngOnInit(): void {
    this.CargarCalendarios();
    this.CargarCarreras();
    this.CargarCronogramas();
    this.CargarMateria();
    this.CargarSemestre();
  }
//CRUD V3: idPK=> id_calend, nomService=> _calend, nombreCRUD=> Calendarios,  dataP=> calend, isSubmitted=>isSubmitted
  calend=[];
  carre=[];
  mat=[];
  sem=[];
  crono=[];
  isSubmitted = false;
  newCalendarios =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_calend:new FormControl(0),
    nombre_calend:new FormControl(''),
    id_crono:new FormControl(''),
    nro_modulo:new FormControl(''),
    id_carre :new FormControl(''),
    id_sem:new FormControl(''),
    id_materia :new FormControl(''),
  })
  CargarCalendarios(){
    this._calend.ObtenerCalendarios()
    .then(res => {
      console.log(res.data);
      this.calend = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarreras(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
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
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCronogramas(){
    this._crono.ObtenerCronogramas()
    .then(res => {
      console.log(res.data);
      this.crono = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetCalendarios(){
    this.newCalendarios.reset();
    this.isSubmitted =false;
  }
  AgregarModificarCalendarios(){
    this.isSubmitted=true;
    if (this.newCalendarios.invalid) {
      return;
    } else {
      let id = this.newCalendarios.controls.id_calend.value;
      console.log(this.newCalendarios.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._calend.AgregarCalendarios(this.newCalendarios.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarCalendarios();
          this.resetCalendarios();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Calendarios');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._calend.ModificarCalendarios(this.newCalendarios.value,this.newCalendarios.value.id_calend)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarCalendarios();
          this.resetCalendarios();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarCalendarios(id){
    if(id){
      const dataCalendarios = this.calend.find(x => x.id_calend === id)
      if(!dataCalendarios) return;
      this._calend.SeleccionarCalendarios(id)
      .then(res=>{
        Object.keys(this.newCalendarios.controls).forEach(key => {
          this.newCalendarios.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newCalendarios.value);
          document.getElementById("btnCrudCalendarios").click();
      });
    }
  }
  EliminarCalendarios(id){
    this._calend.EliminarCalendarios(id)
    .then(res => {
      console.log(res.data);
      this.CargarCalendarios();
    }).catch(err =>  {
    console.log("err",err);
    });
}
}
