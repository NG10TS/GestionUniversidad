import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {


  ruta=environment.service;
    constructor() { }
    ObtenerEvaluacions(){
      return axios.get(this.ruta+'api/Evaluacion/');
    }
    AgregarEvaluacion(Evaluacion){
      return axios.post(this.ruta+'api/Evaluacion/',Evaluacion);
    }
    ModificarEvaluacion(Evaluacion, id){
      return axios.put(this.ruta+'api/Evaluacion/'+id,Evaluacion);
    }
    SeleccionarEvaluacion(id){
      return axios.get(this.ruta+'api/Evaluacion/'+id);
    }
    EliminarEvaluacion(id){
      return axios.delete(this.ruta+'api/Evaluacion/'+id);
    }
}
