import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantedesercionService {
  ruta=environment.service;
  constructor() { }
  ObtenerEstudiantedesercions(){
    return axios.get(this.ruta+'api/Estudiantedesercion/');
  }
  AgregarEstudiantedesercion(Estudiantedesercion){
    return axios.post(this.ruta+'api/Estudiantedesercion/',Estudiantedesercion);
  }
  ModificarEstudiantedesercion(Estudiantedesercion,id){
    return axios.post(this.ruta+'api/EstudiantedesercionUpdate/'+id,Estudiantedesercion);
  }
  SeleccionarEstudiantedesercion(id){
    return axios.get(this.ruta+'api/Estudiantedesercion/'+id);
  }
  EliminarEstudiantedesercion(id){
    return axios.delete(this.ruta+'api/Estudiantedesercion/'+id);
  }
}
