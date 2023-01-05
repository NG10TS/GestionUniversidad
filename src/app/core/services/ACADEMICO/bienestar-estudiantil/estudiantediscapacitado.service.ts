import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantediscapacitadoService {
  ruta=environment.service;
  constructor() { }
  ObtenerEstudiantediscapacitados(){
    return axios.get(this.ruta+'api/Estudiantediscapacitado/');
  }
  AgregarEstudiantediscapacitado(Estudiantediscapacitado){
    return axios.post(this.ruta+'api/Estudiantediscapacitado/',Estudiantediscapacitado);
  }
  ModificarEstudiantediscapacitado(Estudiantediscapacitado, id){
    return axios.post(this.ruta+'api/EstudiantediscapacitadoUpdate/'+id,Estudiantediscapacitado);
  }
  SeleccionarEstudiantediscapacitado(id){
    return axios.get(this.ruta+'api/Estudiantediscapacitado/'+id);
  }
  EliminarEstudiantediscapacitado(id){
    return axios.delete(this.ruta+'api/Estudiantediscapacitado/'+id);
  }
}
