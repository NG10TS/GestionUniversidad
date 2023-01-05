import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenidoAperPoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerContenidoAperPoas(){
      return axios.get(this.ruta+'api/ContenidoAperPoa/');
    }
    AgregarContenidoAperPoa(ContenidoAperPoa){
      return axios.post(this.ruta+'api/ContenidoAperPoa/',ContenidoAperPoa);
    }
    ModificarContenidoAperPoa(ContenidoAperPoa, id){
      return axios.put(this.ruta+'api/ContenidoAperPoa/'+id,ContenidoAperPoa);
    }
    SeleccionarContenidoAperPoa(id){
      return axios.get(this.ruta+'api/ContenidoAperPoa/'+id);
    }
    EliminarContenidoAperPoa(id){
      return axios.delete(this.ruta+'api/ContenidoAperPoa/'+id);
    }
}
