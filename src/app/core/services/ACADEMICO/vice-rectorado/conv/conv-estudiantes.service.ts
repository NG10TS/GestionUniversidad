import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvEstudiantesService {
  ruta=environment.service;
  constructor() { }
  ObtenerConvEstudiantes(){
    return axios.get(this.ruta+'api/ConvEstudiante/');
  }
  AgregarConvEstudiante(ConvEstudiante){
    return axios.post(this.ruta+'api/ConvEstudiante/',ConvEstudiante);
  }
  ModificarConvEstudiante(ConvEstudiante, id){
    return axios.put(this.ruta+'api/ConvEstudiante/'+id,ConvEstudiante);
  }
  SeleccionarConvEstudiante(id){
    return axios.get(this.ruta+'api/ConvEstudiante/'+id);
  }
  EliminarConvEstudiante(id){
    return axios.delete(this.ruta+'api/ConvEstudiante/'+id);
  }
}