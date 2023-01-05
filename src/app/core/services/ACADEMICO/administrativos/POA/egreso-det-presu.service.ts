import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EgresoDetPresuService {

  ruta = environment.service;
  constructor() {}
  ObtenerEgresoDetPresu(){
    return axios.get(this.ruta+'api/EgresoDetPresu/');
  }

  AgregarEgresoDetPresu(EgresoDetPresu){
    return axios.post(this.ruta+'api/EgresoDetPresu/',EgresoDetPresu);
  }

  ModificarEgresoDetPresu(EgresoDetPresu,id){
    return axios.put(this.ruta +'api/EgresoDetPresu/'+id,EgresoDetPresu);
  }

  SeleccionarEgresoDetPresu(id){
    return axios.get(this.ruta+'api/EgresoDetPresu/'+id);
  }

  EliminarEgresoDetPresu(id){
    return axios.delete(this.ruta+'api/EgresoDetPresu/'+id);
  }
}
