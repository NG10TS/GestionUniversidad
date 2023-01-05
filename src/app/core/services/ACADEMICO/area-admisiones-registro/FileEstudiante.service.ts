import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileEstudianteService {
  ruta=environment.service;
  constructor() { }
  ObtenerFileEstudiante(){
    return axios.get(this.ruta+'api/FileEstudiante/');
  }
  AgregarFileEstudiante(FileEstudiante){
    return axios.post(this.ruta+'api/FileEstudiante/',FileEstudiante);
  }
  ModificarFileEstudiante(FileEstudiante,id){
    return axios.post(this.ruta+'api/FileEstudianteUpdate/'+id,FileEstudiante);
  }
  SeleccionarFileEstudiante(id){
    return axios.get(this.ruta+'api/FileEstudiante/'+id);
  }
  EliminarFileEstudiante(id){
    return axios.delete(this.ruta+'api/FileEstudiante/'+id);
  }
}
