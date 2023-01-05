import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronogramaActPoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerCronogramaActPoas(){
      return axios.get(this.ruta+'api/CronogramaActPoa/');
    }
    AgregarCronogramaActPoa(CronogramaActPoa){
      return axios.post(this.ruta+'api/CronogramaActPoa/',CronogramaActPoa);
    }
    ModificarCronogramaActPoa(CronogramaActPoa, id){
      return axios.put(this.ruta+'api/CronogramaActPoa/'+id,CronogramaActPoa);
    }
    SeleccionarCronogramaActPoa(id){
      return axios.get(this.ruta+'api/CronogramaActPoa/'+id);
    }
    EliminarCronogramaActPoa(id){
      return axios.delete(this.ruta+'api/CronogramaActPoa/'+id);
    }
}
