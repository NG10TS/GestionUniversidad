import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CronogramasService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/Cronogramas.service';
import { FechaEvaluasService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/FechaEvaluas.service';

@Component({
  selector: 'app-cronogramas',
  templateUrl: './cronogramas.component.html',
  styleUrls: ['./cronogramas.component.css']
})
export class CronogramasComponent implements OnInit {

  constructor(protected _crono: CronogramasService,protected _fec_eval:FechaEvaluasService) { }

  ngOnInit(): void {
    this.CargarCronogramas();
    this.CargarFechaEvaluas();

  }
//CRUD V3: idPK=> id_crono, nomService=> _crono, nombreCRUD=> Cronogramas,  dataP=> crono, isSubmitted=>isSubmitted
  crono=[];
  fec_eval=[];
  isSubmitted = false;
  newCronogramas =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_crono:new FormControl(0),
    nombre_crono:new FormControl(''),
    // id_fec_evalua:new FormControl(''),
    id_modal:new FormControl(''),
    inicio_crono:new FormControl(''),
    fin_crono:new FormControl(''),
    ire_crono:new FormControl(''),
    fre_crono:new FormControl(''),
    gestion_crono:new FormControl(''),
    periodo_crono:new FormControl(''),
    // id_fechas:new FormControl(''),
  })
  CargarCronogramas(){
    this._crono.ObtenerCronogramas()
    .then(res => {
      console.log(res.data);
      this.crono = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarFechaEvaluas(){
    this._fec_eval.ObtenerFechaEvaluas()
    .then(res => {
      console.log(res.data);
      this.fec_eval = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetCronogramas(){
    this.newCronogramas.reset();
    this.isSubmitted =false;
  }
  AgregarModificarCronogramas(){
    this.isSubmitted=true;
    if (this.newCronogramas.invalid) {
      return;
    } else {
      let id = this.newCronogramas.controls.id_crono.value;
      console.log(this.newCronogramas.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._crono.AgregarCronogramas(this.newCronogramas.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarCronogramas();
          this.resetCronogramas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Cronogramas');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._crono.ModificarCronogramas(this.newCronogramas.value,this.newCronogramas.value.id_crono)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarCronogramas();
          this.resetCronogramas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarCronogramas(id){
    if(id){
      const dataCronogramas = this.crono.find(x => x.id_crono === id)
      if(!dataCronogramas) return;
      this._crono.SeleccionarCronogramas(id)
      .then(res=>{
        Object.keys(this.newCronogramas.controls).forEach(key => {
          this.newCronogramas.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newCronogramas.value);
          document.getElementById("btnCrudCronogramas").click();
      });
    }
  }
  EliminarCronogramas(id){
    this._crono.EliminarCronogramas(id)
    .then(res => {
      console.log(res.data);
      this.CargarCronogramas();
    }).catch(err =>  {
    console.log("err",err);
    });
}
}
