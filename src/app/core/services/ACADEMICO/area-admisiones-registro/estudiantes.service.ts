import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  ruta=environment.service;
  constructor() { }
  ObtenerEstudiantes(){
    return axios.get(this.ruta+'api/Estudiante/');
  }
  AgregarEstudiante(Estudiante){
    return axios.post(this.ruta+'api/Estudiante/',Estudiante);
  }
  ModificarEstudiante(Estudiante, id){
    return axios.post(this.ruta+'api/EstudianteUpdate/'+id,Estudiante);
  }
  SeleccionarEstudiante(id){
    return axios.get(this.ruta+'api/Estudiante/'+id);
  }
  EliminarEstudiante(id){
    return axios.delete(this.ruta+'api/Estudiante/'+id);
  }
}
