import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEstudiantesService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerAsignacionEstudiantes(){
    return axios.get(this.ruta+'api/AsignacionEstudiante/');
  }
  AgregarAsignacionEstudiante(AsignacionEstudiante){
    return axios.post(this.ruta+'api/AsignacionEstudiante/',AsignacionEstudiante);
  }
  ModificarAsignacionEstudiante(AsignacionEstudiante,id){
    return axios.post(this.ruta+'api/AsignacionEstudianteUpdate/'+id,AsignacionEstudiante);
  }
  SeleccionarAsignacionEstudiante(id){
    return axios.get(this.ruta+'api/AsignacionEstudiante/'+id);
  }
  EliminarAsignacionEstudiante(id){
    return axios.delete(this.ruta+'api/AsignacionEstudiante/'+id);
  }
}
