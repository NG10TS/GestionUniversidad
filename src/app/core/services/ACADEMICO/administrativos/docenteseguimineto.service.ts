import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class docenteseguiminetoService {
  ruta=environment.service;
  constructor() { }
  Obtenerdocenteseguiminetos(){
    return axios.get(this.ruta+'api/Docente_seguis/');
  }
  Obtenerlistaindex(){
    return axios.get(this.ruta+'api/index_lista/');
  }
  Obtenernotaindex(){
    return axios.get(this.ruta+'api/index_nota/');
  }
  Agregardocenteseguimineto(docenteseguimineto){
    return axios.post(this.ruta+'api/Docente_seguis/',docenteseguimineto);
  }
  Modificardocenteseguimineto(docenteseguimineto,id){
    return axios.post(this.ruta+'api/Docente_seguisUpdate/'+id,docenteseguimineto);
  }
  Seleccionardocenteseguimineto(id){
    return axios.get(this.ruta+'api/Docente_seguis/'+id);
  }
  Eliminardocenteseguimineto(id){
    return axios.delete(this.ruta+'api/Docente_seguis/'+id);
  }

}
