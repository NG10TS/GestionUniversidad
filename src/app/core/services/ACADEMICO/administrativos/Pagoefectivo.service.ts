import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoefectivoService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPagoefectivo(){
    return axios.get(this.ruta+'api/Pagoefectivo/');
  }
  AgregarPagoefectivo(Pagoefectivo){
    return axios.post(this.ruta+'api/Pagoefectivo/',Pagoefectivo);
  }
  ModificarPagoefectivo(Pagoefectivo,id){
    return axios.post(this.ruta+'api/PagoefectivoUpdate/'+id,Pagoefectivo);
  }
  SeleccionarPagoefectivo(id){
    return axios.get(this.ruta+'api/Pagoefectivo/'+id);
  }
  EliminarPagoefectivo(id){
    return axios.delete(this.ruta+'api/Pagoefectivo/'+id);
  }

}
