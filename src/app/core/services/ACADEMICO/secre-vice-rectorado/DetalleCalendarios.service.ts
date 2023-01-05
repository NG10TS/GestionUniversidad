import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleCalendariosService {
  ruta=environment.service;
  constructor() { }
  ObtenerDetalleCalendarios(){
    return axios.get(this.ruta+'api/DetalleCalendarios/');
  }
  AgregarDetalleCalendarios(DetalleCalendarios){
    return axios.post(this.ruta+'api/DetalleCalendarios/',DetalleCalendarios);
  }
  ModificarDetalleCalendarios(DetalleCalendarios,id){
    return axios.post(this.ruta+'api/DetalleCalendariosUpdate/'+id,DetalleCalendarios);
  }
  SeleccionarDetalleCalendarios(id){
    return axios.get(this.ruta+'api/DetalleCalendarios/'+id);
  }
  EliminarDetalleCalendarios(id){
    return axios.delete(this.ruta+'api/DetalleCalendarios/'+id);
  }
}
