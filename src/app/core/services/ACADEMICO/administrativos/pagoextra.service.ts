import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoextraService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPagoextra(){
    return axios.get(this.ruta+'api/Pagoextra/');
  }
  AgregarPagoextra(Pagoextra){
    return axios.post(this.ruta+'api/Pagoextra/',Pagoextra);
  }
  ModificarPagoextra(Pagoextra,id){
    return axios.post(this.ruta+'api/PagoextraUpdate/'+id,Pagoextra);
  }
  SeleccionarPagoextra(id){
    return axios.get(this.ruta+'api/Pagoextra/'+id);
  }
  EliminarPagoextra(id){
    return axios.delete(this.ruta+'api/Pagoextra/'+id);
  }

}
