import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { PlaninscripcionService } from 'src/app/core/services/ACADEMICO/vice-rectorado/planinscripcion.service';

@Component({
  selector: 'app-planinscripcion',
  templateUrl: './planinscripcion.component.html',
  styleUrls: ['./planinscripcion.component.css']
})
export class PlaninscripcionComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  planins=[];

  newPlanInscripcion = new FormGroup({

    // id_plan_ins :new FormControl(''),
    nombre_plan :new FormControl(''),
    plan_vigente :new FormControl(''),
    plan_bs :new FormControl(''),
    arr_2011:new FormControl(''),
    arr_2012: new FormControl(''),

  });

  PlanInscripcionSeleccionado = {
    id_plan_ins :'',
    nombre_plan :'',
    plan_vigente :'',
    plan_bs :'',
    arr_2011:'',
    arr_2012:'',

  }
  constructor(protected _pInscripciones: PlaninscripcionService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarPlanInscripcions();

  }

    LimpiarPlanInscripcions(){
    this.PlanInscripcionSeleccionado = {
    id_plan_ins :'',
      nombre_plan :'',
      plan_vigente :'',
      plan_bs :'',
      arr_2011:'',
      arr_2012:'',


    };

    this.newPlanInscripcion.patchValue({
    // id_plan_ins :'',
      nombre_plan :'',
      plan_vigente :'',
      plan_bs :'',
      arr_2011:'',
      arr_2012:'',

    })
    }
  CargarPlanInscripcions(){
    this._pInscripciones.Obtenerplaninscripciones()
    .then(res => {
      console.log(res.data);
      this.planins = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  AgregarPlanInscripcion(){
    const formData = new FormData();
      // id_ins :'',
    formData.append('nombre_plan',this.newPlanInscripcion.value.nombre_plan);
    formData.append('plan_vigente',this.newPlanInscripcion.value.plan_vigente);
    formData.append('plan_bs',this.newPlanInscripcion.value.plan_bs);
    formData.append('arr_2011',this.newPlanInscripcion.value.arr_2011);
    formData.append('arr_2012',this.newPlanInscripcion.value.arr_2012);
    console.log('datos a gregar',this.newPlanInscripcion.value)
    this._pInscripciones.Agregarplaninscripciones(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarPlanInscripcions();
      this.LimpiarPlanInscripcions();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR ');
      console.log(error);
    })
  }

  SeleccionarPlanInscripcion(id,Modo){
    this._pInscripciones.Seleccionarplaninscripciones(id)
    .then(res => {
      var a = res.data;
      this.PlanInscripcionSeleccionado = a;
      console.log('INFO PER SELECCIONADO',this.PlanInscripcionSeleccionado);
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
  ModificarPlanInscripcion(PlanInscripcion){
    console.log('DATOS A ACTUALIZAR',PlanInscripcion)
    const formData = new FormData();
    formData.append('id_plan_ins',PlanInscripcion.id_plan_ins);
    formData.append('nombre_plan',PlanInscripcion.nombre_plan);
    formData.append('plan_vigente',PlanInscripcion.plan_vigente);
    formData.append('plan_bs',PlanInscripcion.plan_bs);
    formData.append('arr_2011',PlanInscripcion.arr_2011);
    formData.append('arr_2012',PlanInscripcion.arr_2012);
    this._pInscripciones.Modificarplaninscripciones(formData,PlanInscripcion.id_plan_ins)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarPlanInscripcions();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarPlanInscripcions();
    })
  }
  EliminarPlanInscripcion(id){
    this._pInscripciones.Eliminarplaninscripciones(id)
    .then(res => {
      console.log(res.data);
      this.CargarPlanInscripcions();
    }).catch(err =>  {
    console.log("err");
    });
  }
}


