import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionMatService {

  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerAsignacionMats(){
    return axios.get(this.ruta+'api/AsignacionMat/');
  }
  AgregarAsignacionMat(AsignacionMat){
    return axios.post(this.ruta+'api/AsignacionMat/',AsignacionMat);
  }
  ModificarAsignacionMat(AsignacionMat, id){
    return axios.post(this.ruta+'api/AsignacionMatUpdate/'+id,AsignacionMat);
  }
  SeleccionarAsignacionMat(id){
    return axios.get(this.ruta+'api/AsignacionMat/'+id);
  }
  EliminarAsignacionMat(id){
    return axios.delete(this.ruta+'api/AsignacionMat/'+id);
  }



  ObtenerFKAsignacionMat(){
    return axios.get(this.ruta+'api/CargarFKAsignacionMats/');
  }
  ObtenerLastNroAsignacion(){
    return axios.get(this.ruta+'api/ObtenerNroAsignacion/');
  }
}
