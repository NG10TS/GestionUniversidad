import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DeudasService } from 'src/app/core/services/ACADEMICO/administrativos/Deudas.service';
import { PlandeudaService } from 'src/app/core/services/ACADEMICO/administrativos/Plandeuda.service';
import { PlaninscripcionService } from 'src/app/core/services/ACADEMICO/vice-rectorado/planinscripcion.service';

@Component({
  selector: 'app-plandeuda',
  templateUrl: './plandeuda.component.html',
  styleUrls: ['./plandeuda.component.css']
})
export class PlandeudaComponent implements OnInit {

  constructor(protected  _plandeu: PlandeudaService, protected  _deuda: DeudasService, protected  _planins: PlaninscripcionService,) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarPlandeuda();  
    this.CargarPlanInscripcions();
    this.CargarDeudas();    
  }

deuda=[];
planins=[];

//CRUD V3: idPK=> id_plandeuda, nomService=> _plandeu, nombreCRUD=> Plandeuda,  dataP=> plandeu, isSubmitted=>isSubmitted
  plandeu=[];
  isSubmitted = false;
  newPlandeuda =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_plandeuda:new FormControl(0),
    id_deuda:new FormControl(''),
    id_plan_ins:new FormControl(''),
  })
  CargarPlanInscripcions(){
    this._planins.Obtenerplaninscripciones()
    .then(res => {
      console.log(res.data);
      this.planins = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarDeudas(){
    this._deuda.ObtenerDeudas()
    .then(res => {
      console.log('Deudas CARGADO',res.data);
      this.deuda = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Deudas',err.response.data.message);
    });
  }
 
  CargarPlandeuda(){
    this._plandeu.ObtenerPlandeuda()
    .then(res => {
      console.log('Plandeuda CARGADO',res.data);
      this.plandeu = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Plandeuda',err.response.data.message);
    });
  }
  resetPlandeuda(){
    this.newPlandeuda.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPlandeuda(){
    this.isSubmitted=true;
    if (this.newPlandeuda.invalid) {
      return;
    } else {
      let id = this.newPlandeuda.controls.id_plandeuda.value;
      console.log(this.newPlandeuda.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._plandeu.AgregarPlandeuda(this.newPlandeuda.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Plandeuda',res.data);
          this.CargarPlandeuda();
          this.resetPlandeuda();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Plandeuda');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._plandeu.ModificarPlandeuda(this.newPlandeuda.value,this.newPlandeuda.value.id_plandeuda)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Plandeuda',res.data);
          this.CargarPlandeuda();
          this.resetPlandeuda();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Plandeuda');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPlandeuda(id){
    if(id){
      const dataPlandeuda = this.plandeu.find(x => x.id_plandeuda === id)
      if(!dataPlandeuda) return;
      this._plandeu.SeleccionarPlandeuda(id)
      .then(res=>{
        Object.keys(this.newPlandeuda.controls).forEach(key => {
          this.newPlandeuda.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Plandeuda EXITOSA',this.newPlandeuda.value);
          document.getElementById("btnCrudPlandeuda").click();
      });
    }
  }
  EliminarPlandeuda(id){
    this._plandeu.EliminarPlandeuda(id)
    .then(res => {
      console.log(res.data);
      this.CargarPlandeuda();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Plandeuda',err.response.data.message);
    });
}
}
