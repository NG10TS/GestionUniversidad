import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendariosService {
  ruta=environment.service;
  constructor() { }
  ObtenerCalendarios(){
    return axios.get(this.ruta+'api/Calendarios/');
  }
  AgregarCalendarios(Calendarios){
    return axios.post(this.ruta+'api/Calendarios/',Calendarios);
  }
  ModificarCalendarios(Calendarios,id){
    return axios.post(this.ruta+'api/CalendariosUpdate/'+id,Calendarios);
  }
  SeleccionarCalendarios(id){
    return axios.get(this.ruta+'api/Calendarios/'+id);
  }
  EliminarCalendarios(id){
    return axios.delete(this.ruta+'api/Calendarios/'+id);
  }
}
