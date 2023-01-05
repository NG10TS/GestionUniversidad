import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarreraOrigenService {
  ruta=environment.service;
  constructor() { }
  ObtenerCarrConvs(){
    return axios.get(this.ruta+'api/CarrConv/');
  }
  AgregarCarrConv(CarrConv){
    return axios.post(this.ruta+'api/CarrConv/',CarrConv);
  }
  ModificarCarrConv(CarrConv, id){
    return axios.put(this.ruta+'api/CarrConv/'+id,CarrConv);
  }
  SeleccionarCarrConv(id){
    return axios.get(this.ruta+'api/CarrConv/'+id);
  }
  EliminarCarrConv(id){
    return axios.delete(this.ruta+'api/CarrConv/'+id);
  }
}
