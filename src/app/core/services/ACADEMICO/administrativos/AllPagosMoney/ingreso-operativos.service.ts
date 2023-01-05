import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoOperativosService {

  ruta=environment.service;
    constructor() { }
    ObtenerIngresoOperativos(){
      return axios.get(this.ruta+'api/IngresoOperativo/');
    }
    AgregarIngresoOperativo(IngresoOperativo){
      return axios.post(this.ruta+'api/IngresoOperativo/',IngresoOperativo);
    }
    ModificarIngresoOperativo(IngresoOperativo, id){
      return axios.put(this.ruta+'api/IngresoOperativo/'+id,IngresoOperativo);
    }
    SeleccionarIngresoOperativo(id){
      return axios.get(this.ruta+'api/IngresoOperativo/'+id);
    }
    EliminarIngresoOperativo(id){
      return axios.delete(this.ruta+'api/IngresoOperativo/'+id);
    }
}
