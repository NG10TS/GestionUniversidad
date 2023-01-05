import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresoOperativosService {

ruta=environment.service;
  constructor() { }
  ObtenerEgresoOperativos(){
    return axios.get(this.ruta+'api/EgresoOperativo/');
  }
  AgregarEgresoOperativo(EgresoOperativo){
    return axios.post(this.ruta+'api/EgresoOperativo/',EgresoOperativo);
  }
  ModificarEgresoOperativo(EgresoOperativo, id){
    return axios.put(this.ruta+'api/EgresoOperativo/'+id,EgresoOperativo);
  }
  SeleccionarEgresoOperativo(id){
    return axios.get(this.ruta+'api/EgresoOperativo/'+id);
  }
  EliminarEgresoOperativo(id){
    return axios.delete(this.ruta+'api/EgresoOperativo/'+id);
  }
}
