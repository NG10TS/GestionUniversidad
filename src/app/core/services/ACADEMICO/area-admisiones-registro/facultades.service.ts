import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {
  ruta=environment.service;
  constructor() { }

  ObtenerFacultades(){
    return axios.get(this.ruta+'api/Facultad/');
  }
  AgregarFacultad(Facultad){
    return axios.post(this.ruta+'api/Facultad/',Facultad);
  }
  ModificarFacultad(Facultad, id){
    return axios.post(this.ruta+'api/FacultadUpdate/'+id,Facultad);
  }
  SeleccionarFacultad(id){
    return axios.get(this.ruta+'api/Facultad/'+id);
  }
  EliminarFacultad(id){
    return axios.delete(this.ruta+'api/Facultad/'+id);
  }
}
