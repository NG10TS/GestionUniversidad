import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvContenidosService {
  ruta=environment.service;
  constructor() { }
  ObtenerConvContenidos(){
    return axios.get(this.ruta+'api/ConvContenidos/');
  }
  AgregarConvContenidos(ConvContenidos){
    return axios.post(this.ruta+'api/ConvContenidos/',ConvContenidos);
  }
  ModificarConvContenidos(ConvContenidos, id){
    return axios.put(this.ruta+'api/ConvContenidos/'+id,ConvContenidos);
  }
  SeleccionarConvContenidos(id){
    return axios.get(this.ruta+'api/ConvContenidos/'+id);
  }
  EliminarConvContenidos(id){
    return axios.delete(this.ruta+'api/ConvContenidos/'+id);
  }
}
