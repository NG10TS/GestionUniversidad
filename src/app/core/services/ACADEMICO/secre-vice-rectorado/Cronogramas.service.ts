import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CronogramasService {
  ruta=environment.service;
  constructor() { }
  ObtenerCronogramas(){
    return axios.get(this.ruta+'api/Cronogramas/');
  }
  AgregarCronogramas(Cronogramas){
    return axios.post(this.ruta+'api/Cronogramas/',Cronogramas);
  }
  ModificarCronogramas(Cronogramas,id){
    return axios.post(this.ruta+'api/CronogramasUpdate/'+id,Cronogramas);
  }
  SeleccionarCronogramas(id){
    return axios.get(this.ruta+'api/Cronogramas/'+id);
  }
  EliminarCronogramas(id){
    return axios.delete(this.ruta+'api/Cronogramas/'+id);
  }
}
