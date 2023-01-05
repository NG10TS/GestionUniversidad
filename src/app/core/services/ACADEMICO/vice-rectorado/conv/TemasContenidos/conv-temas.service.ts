import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvTemasService {

  ruta=environment.service;
  constructor() { }
  ObtenerConvTemas(){
    return axios.get(this.ruta+'api/ConvTemas/');
  }
  AgregarConvTemas(ConvTemas){
    return axios.post(this.ruta+'api/ConvTemas/',ConvTemas);
  }
  ModificarConvTemas(ConvTemas, id){
    return axios.put(this.ruta+'api/ConvTemas/'+id,ConvTemas);
  }
  SeleccionarConvTemas(id){
    return axios.get(this.ruta+'api/ConvTemas/'+id);
  }
  EliminarConvTemas(id){
    return axios.delete(this.ruta+'api/ConvTemas/'+id);
  }
}
