import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemaContenidosService {

  ruta=environment.service;
  constructor() { }
  ObtenerTemaContenidos(){
    return axios.get(this.ruta+'api/TemaContenidos/');
  }
  AgregarTemaContenidos(TemaContenidos){
    return axios.post(this.ruta+'api/TemaContenidos/',TemaContenidos);
  }
  ModificarTemaContenidos(TemaContenidos, id){
    return axios.put(this.ruta+'api/TemaContenidos/'+id,TemaContenidos);
  }
  SeleccionarTemaContenidos(id){
    return axios.get(this.ruta+'api/TemaContenidos/'+id);
  }
  EliminarTemaContenidos(id){
    return axios.delete(this.ruta+'api/TemaContenidos/'+id);
  }
}
