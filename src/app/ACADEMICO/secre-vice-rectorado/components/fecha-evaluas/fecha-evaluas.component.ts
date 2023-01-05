import { EvaluacionesService } from './../../../../core/services/ACADEMICO/secre-vice-rectorado/evaluaciones.service';
import { ModulosService } from './../../../../core/services/ACADEMICO/secre-vice-rectorado/modulos.service';
import { FechaEvaluasService } from './../../../../core/services/ACADEMICO/secre-vice-rectorado/FechaEvaluas.service';
import { CronogramasService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/Cronogramas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-fecha-evaluas',
  templateUrl: './fecha-evaluas.component.html',
  styleUrls: ['./fecha-evaluas.component.css']
})
export class FechaEvaluasComponent implements OnInit {

  constructor(protected _fec_eval: FechaEvaluasService,
              protected _crono: CronogramasService,
              protected _modulo:ModulosService,
              protected _evalua: EvaluacionesService
  ) { }

  ngOnInit(): void {
    this.CargarFechaEvaluas();
  }

//#region CARGAS EXTRAS
  cronograma=[]
  CargarCronograma(){
    this._crono.ObtenerCronogramas()
    .then(res => {
      console.log("Cronograma Cargado",res.data);
      this.cronograma = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Cronograma',error.response.data.response);
    });
  }

   modulo=[]
    CargarModulo(){
      this._modulo.ObtenerModulos()
      .then(res => {
        console.log("Modulo Cargado",res.data);
        this.modulo = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar Modulo',error.response.data.response);
      });
    }

      eval=[]
       CargarEvaluacion(){
         this._evalua.ObtenerEvaluacions()
         .then(res => {
           console.log("Evaluacion Cargado",res.data);
           this.eval = res.data;
         }).catch(error =>  {
         console.log('Error al Cargar Evaluacion',error.response.data.response);
         });
       }

//#endregion CARGAS EXTRAS


  //#region CRUD PRINCIPAL FECHA EVALUACION
  fec_eval=[];
  isSubmitted = false;
  newFechaEvaluas =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_fec_evalua:new FormControl(0),
    id_crono: new FormControl(''),
    nro_modulo: new FormControl(''),
    inicio_evalua:new FormControl(''),
    fin_evalua:new FormControl(''),
    id_evalua:new FormControl(''),
    // nro_modulo:new FormControl(''),
  })
  CargarFechaEvaluas(){
    this._fec_eval.ObtenerFechaEvaluas()
    .then(res => {
      console.log(res.data);
      this.fec_eval = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetFechaEvaluas(){
    this.newFechaEvaluas.reset();
    this.isSubmitted =false;
  }
  AgregarModificarFechaEvaluas(){
    this.isSubmitted=true;
    if (this.newFechaEvaluas.invalid) {
      return;
    } else {
      let id = this.newFechaEvaluas.controls.id_fec_evalua.value;
      console.log(this.newFechaEvaluas.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._fec_eval.AgregarFechaEvaluas(this.newFechaEvaluas.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarFechaEvaluas();
          this.resetFechaEvaluas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR FechaEvaluas');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._fec_eval.ModificarFechaEvaluas(this.newFechaEvaluas.value,this.newFechaEvaluas.value.id_fec_evalua)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarFechaEvaluas();
          this.resetFechaEvaluas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarFechaEvaluas(id){
    if(id){
      const dataFechaEvaluas = this.fec_eval.find(x => x.id_fec_evalua === id)
      if(!dataFechaEvaluas) return;
      this._fec_eval.SeleccionarFechaEvaluas(id)
      .then(res=>{
        Object.keys(this.newFechaEvaluas.controls).forEach(key => {
          this.newFechaEvaluas.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newFechaEvaluas.value);
          document.getElementById("btnCrudFechaEvaluas").click();
      });
    }
  }
  EliminarFechaEvaluas(id){
    this._fec_eval.EliminarFechaEvaluas(id)
    .then(res => {
      console.log(res.data);
      this.CargarFechaEvaluas();
    }).catch(err =>  {
    console.log("err",err);
    });
}
//#endregion CRUD PRINCIPAL FECHA EVALUACION
}
