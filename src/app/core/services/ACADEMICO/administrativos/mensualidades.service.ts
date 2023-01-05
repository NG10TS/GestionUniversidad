import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensualidadesService {

ruta=environment.service;
  constructor() { }
  ObtenerMensualidads(){
    return axios.get(this.ruta+'api/Mensualidad/');
  }
  AgregarMensualidad(Mensualidad){
    return axios.post(this.ruta+'api/Mensualidad/',Mensualidad);
  }
  ModificarMensualidad(Mensualidad, id){
    return axios.put(this.ruta+'api/Mensualidad/'+id,Mensualidad);
  }
  SeleccionarMensualidad(id){
    return axios.get(this.ruta+'api/Mensualidad/'+id);
  }
  EliminarMensualidad(id){
    return axios.delete(this.ruta+'api/Mensualidad/'+id);
  }
}
