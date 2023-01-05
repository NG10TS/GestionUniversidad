import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  ruta=environment.service;
  constructor() { }
  //PARA BANCOS
  ObtenerBancos(){
    return axios.get(this.ruta+'api/Bancos/');
  }
  AgregarBancos(Bancos){
    return axios.post(this.ruta+'api/Bancos/',Bancos);
  }
  ModificarBancos(Bancos,id){
    return axios.put(this.ruta+'api/Bancos/'+id,Bancos);
  }
  SeleccionarBancos(id){
    return axios.get(this.ruta+'api/Bancos/'+id);
  }
  EliminarBancos(id){
    return axios.delete(this.ruta+'api/Bancos/'+id);
  }


}
