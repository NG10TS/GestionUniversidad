import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvEstUniCarrerasService {
  ruta=environment.service;
  constructor() { }
  ObtenerConv_Est_Uni_Carrerass(){
    return axios.get(this.ruta+'api/Conv_Est_Uni_Carreras/');
  }
  AgregarConv_Est_Uni_Carreras(Conv_Est_Uni_Carreras){
    return axios.post(this.ruta+'api/Conv_Est_Uni_Carreras/',Conv_Est_Uni_Carreras);
  }
  ModificarConv_Est_Uni_Carreras(Conv_Est_Uni_Carreras, id){
    return axios.put(this.ruta+'api/Conv_Est_Uni_Carreras/'+id,Conv_Est_Uni_Carreras);
  }
  SeleccionarConv_Est_Uni_Carreras(id){
    return axios.get(this.ruta+'api/Conv_Est_Uni_Carreras/'+id);
  }
  EliminarConv_Est_Uni_Carreras(id){
    return axios.delete(this.ruta+'api/Conv_Est_Uni_Carreras/'+id);
  }

}
