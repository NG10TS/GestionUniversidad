import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class docenteseguimineto2Service {
  ruta=environment.service;
  constructor() { }
  Obtenerdocenteseguiminetos2(){
    return axios.get(this.ruta+'api/Docente_seguis2/');
  }
  Agregardocenteseguimineto2(docenteseguimineto){
    return axios.post(this.ruta+'api/Docente_seguis2/',docenteseguimineto);
  }
  Modificardocenteseguimineto2(docenteseguimineto,id){
    return axios.post(this.ruta+'api/Docente_seguis2Update/'+id,docenteseguimineto);
  }
  Seleccionardocenteseguimineto2(id){
    return axios.get(this.ruta+'api/Docente_seguis2/'+id);
  }
  Eliminardocenteseguimineto2(id){
    return axios.delete(this.ruta+'api/Docente_seguis2/'+id);
  }
}
