import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversidadesService {
  ruta=environment.service;
  constructor() { }
  ObtenerUniversidades(){
    return axios.get(this.ruta+'api/Universidades/');
  }
  AgregarUniversidades(Universidades){
    return axios.post(this.ruta+'api/Universidades/',Universidades);
  }
  ModificarUniversidades(Universidades, id){
    return axios.post(this.ruta+'api/UniversidadesUpdate/'+id,Universidades);
  }
  SeleccionarUniversidades(id){
    return axios.get(this.ruta+'api/Universidades/'+id);
  }
  EliminarUniversidades(id){
    return axios.delete(this.ruta+'api/Universidades/'+id);
  }

}
