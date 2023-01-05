import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  ruta=environment.service;
  constructor() { }
  ObtenerDocentes(){
    return axios.get(this.ruta+'api/Docente/');
  }
  AgregarDocente(Docente){
    return axios.post(this.ruta+'api/Docente/',Docente);
  }
  ModificarDocente(Docente,id){
    return axios.post(this.ruta+'api/DocenteUpdate/'+id,Docente);
  }
  SeleccionarDocente(id){
    return axios.get(this.ruta+'api/Docente/'+id);
  }
  EliminarDocente(id){
    return axios.delete(this.ruta+'api/Docente/'+id);
  }
}
