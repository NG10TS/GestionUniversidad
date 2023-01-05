import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  ruta=environment.service;
  constructor() { }
  ObtenerSemestres(){
    return axios.get(this.ruta+'api/Semestre/');
  }
  AgregarSemestre(Semestre){
    return axios.post(this.ruta+'api/Semestre/',Semestre);
  }
  ModificarSemestre(Semestre, id){
    return axios.post(this.ruta+'api/SemestreUpdate/'+id,Semestre);
  }
  SeleccionarSemestre(id){
    return axios.get(this.ruta+'api/Semestre/'+id);
  }
  EliminarSemestre(id){
    return axios.delete(this.ruta+'api/Semestre/'+id);
  }
}
