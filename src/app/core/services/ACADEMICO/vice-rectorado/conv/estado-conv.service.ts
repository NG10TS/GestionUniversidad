import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoConvService {
  ruta=environment.service;
  constructor() { }
  ObtenerEstadoConvUnivs(){
    return axios.get(this.ruta+'api/EstadoConvUniv/');
  }
  AgregarEstadoConvUniv(EstadoConvUniv){
    return axios.post(this.ruta+'api/EstadoConvUniv/',EstadoConvUniv);
  }
  ModificarEstadoConvUniv(EstadoConvUniv, id){
    return axios.put(this.ruta+'api/EstadoConvUniv/'+id,EstadoConvUniv);
  }
  SeleccionarEstadoConvUniv(id){
    return axios.get(this.ruta+'api/EstadoConvUniv/'+id);
  }
  EliminarEstadoConvUniv(id){
    return axios.delete(this.ruta+'api/EstadoConvUniv/'+id);
  }
}
