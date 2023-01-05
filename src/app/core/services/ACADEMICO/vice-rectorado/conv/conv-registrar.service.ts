import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvRegistrarService {
  ruta=environment.service;
  constructor() { }
  ObtenerUniCarreMats(){
    return axios.get(this.ruta+'api/UniCarreMat/');
  }
  AgregarUniCarreMat(UniCarreMat){
    return axios.post(this.ruta+'api/UniCarreMat/',UniCarreMat);
  }
  ModificarUniCarreMat(UniCarreMat, id){
    return axios.post(this.ruta+'api/UniCarreMatUpdate/'+id,UniCarreMat);
  }
  SeleccionarUniCarreMat(id){
    return axios.get(this.ruta+'api/UniCarreMat/'+id);
  }
  EliminarUniCarreMat(id){
    return axios.delete(this.ruta+'api/UniCarreMat/'+id);
  }
}
