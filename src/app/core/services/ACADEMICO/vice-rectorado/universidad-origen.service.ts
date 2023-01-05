import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversidadOrigenService {
  ruta=environment.service;
  constructor() { }
  ObtenerUniConvs(){
    return axios.get(this.ruta+'api/UniConv/');
  }
  AgregarUniConv(UniConv){
    return axios.post(this.ruta+'api/UniConv/',UniConv);
  }
  ModificarUniConv(UniConv, id){
    return axios.put(this.ruta+'api/UniConv/'+id,UniConv);
  }
  SeleccionarUniConv(id){
    return axios.get(this.ruta+'api/UniConv/'+id);
  }
  EliminarUniConv(id){
    return axios.delete(this.ruta+'api/UniConv/'+id);
  }
}
