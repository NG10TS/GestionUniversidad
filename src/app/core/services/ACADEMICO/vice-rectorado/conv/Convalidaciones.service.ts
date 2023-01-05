import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvalidacionesService {
  ruta=environment.service;
  constructor() { }
  ObtenerConvalidaciones(){
    return axios.get(this.ruta+'api/Convalidacion/');
  }
  AgregarConvalidacion(Convalidacion){
    return axios.post(this.ruta+'api/Convalidacion/',Convalidacion);
  }
  ModificarConvalidacion(Convalidacion, id){
    return axios.put(this.ruta+'api/Convalidacion/'+id,Convalidacion);
  }
  SeleccionarConvalidacion(id){
    return axios.get(this.ruta+'api/Convalidacion/'+id);
  }
  EliminarConvalidacion(id){
    return axios.delete(this.ruta+'api/Convalidacion/'+id);
  }
}
