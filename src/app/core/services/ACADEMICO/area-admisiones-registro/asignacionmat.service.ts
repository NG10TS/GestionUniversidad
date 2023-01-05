import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionmatService {
  ruta=environment.service;
  constructor() { }
  ObtenerAsignacionmats(){
    return axios.get(this.ruta+'api/Asignacionmat/');
  }
  AgregarAsignacionmat(Asignacionmat){
    return axios.post(this.ruta+'api/Asignacionmat/',Asignacionmat);
  }
  ModificarAsignacionmat(Asignacionmat, id){
    return axios.post(this.ruta+'api/AsignacionmatUpdate/'+id,Asignacionmat);
  }
  SeleccionarAsignacionmat(id){
    return axios.get(this.ruta+'api/Asignacionmat/'+id);
  }
  EliminarAsignacionmat(id){
    return axios.delete(this.ruta+'api/Asignacionmat/'+id);
  }
}
