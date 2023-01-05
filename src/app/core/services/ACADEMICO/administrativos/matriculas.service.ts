import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
ruta=environment.service;
  constructor() { }
  ObtenerMatriculas(){
    return axios.get(this.ruta+'api/Matricula/');
  }
  AgregarMatricula(Matricula){
    return axios.post(this.ruta+'api/Matricula/',Matricula);
  }
  ModificarMatricula(Matricula, id){
    return axios.put(this.ruta+'api/Matricula/'+id,Matricula);
  }
  SeleccionarMatricula(id){
    return axios.get(this.ruta+'api/Matricula/'+id);
  }
  EliminarMatricula(id){
    return axios.delete(this.ruta+'api/Matricula/'+id);
  }
}
