import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {
  ruta=environment.service;
  constructor() { }
  ObtenerEgresados(){
    return axios.get(this.ruta+'api/Egresados/');
  }
  AgregarEgresados(Egresados){
    return axios.post(this.ruta+'api/Egresados/',Egresados);
  }
  ModificarEgresados(Egresados, id){
    return axios.post(this.ruta+'api/EgresadosUpdate/'+id,Egresados);
  }
  SeleccionarEgresados(id){
    return axios.get(this.ruta+'api/Egresados/'+id);
  }
  EliminarEgresados(id){
    return axios.delete(this.ruta+'api/Egresados/'+id);
  }
}