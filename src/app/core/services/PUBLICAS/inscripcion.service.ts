import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  ruta=environment.service;
  constructor() { }
  ObtenerInscripcions(){
    return axios.get(this.ruta+'api/Inscripcion/');
  }
  AgregarInscripcion(Inscripcion){
    return axios.post(this.ruta+'api/Inscripcion/',Inscripcion);
  }
  ModificarInscripcion(Inscripcionform, id){
    return axios.post(this.ruta+'api/InscripcionesUpdate/'+id,Inscripcionform);
  }
  SeleccionarInscripcion(id){
    return axios.get(this.ruta+'api/Inscripcion/'+id);
  }
  EliminarInscripcion(id){
    return axios.delete(this.ruta+'api/Inscripcion/'+id);
  }
}
