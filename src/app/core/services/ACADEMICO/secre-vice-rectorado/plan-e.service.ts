import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanEService {
  ruta=environment.service;
  constructor() { }
  ObtenerCarreMats(){
    return axios.get(this.ruta+'api/CarreMat/');
  }
  AgregarCarreMat(CarreMat){
    return axios.post(this.ruta+'api/CarreMat/',CarreMat);
  }
  ModificarCarreMat(CarreMat,id){
    return axios.post(this.ruta+'api/CarreMatUpdate/'+id,CarreMat);
  }
  SeleccionarCarreMat(id){
    return axios.get(this.ruta+'api/CarreMat/'+id);
  }
  EliminarCarreMat(id){
    return axios.delete(this.ruta+'api/CarreMat/'+id);
  }
}
