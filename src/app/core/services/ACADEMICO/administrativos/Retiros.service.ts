import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetirosService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerRetiros(){
    return axios.get(this.ruta+'api/Retiros/');
  }
  AgregarRetiros(Retiros){
    return axios.post(this.ruta+'api/Retiros/',Retiros);
  }
  ModificarRetiros(Retiros,id){
    return axios.post(this.ruta+'api/RetirosUpdate/'+id,Retiros);
  }
  SeleccionarRetiros(id){
    return axios.get(this.ruta+'api/Retiros/'+id);
  }
  EliminarRetiros(id){
    return axios.delete(this.ruta+'api/Retiros/'+id);
  }

}
