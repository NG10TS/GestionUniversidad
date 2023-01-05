import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresadoTitulosService {
  ruta=environment.service;
  constructor() { }
  ObtenerEgresadotitulos(){
    return axios.get(this.ruta+'api/Egresadotitulos/');
  }
  AgregarEgresadotitulos(Egresadotitulos){
    return axios.post(this.ruta+'api/Egresadotitulos/',Egresadotitulos);
  }
  ModificarEgresadotitulos(Egresadotitulos,id){
    return axios.post(this.ruta+'api/EgresadotitulosUpdate/'+id,Egresadotitulos);
  }
  SeleccionarEgresadotitulos(id){
    return axios.get(this.ruta+'api/Egresadotitulos/'+id);
  }
  EliminarEgresadotitulos(id){
    return axios.delete(this.ruta+'api/Egresadotitulos/'+id);
  }
}
