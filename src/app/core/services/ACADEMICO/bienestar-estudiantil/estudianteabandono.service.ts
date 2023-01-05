import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteabandonoService {
  ruta=environment.service;
  constructor() { }
  ObtenerEstudianteabandonos(){
    return axios.get(this.ruta+'api/Estudianteabandono/');
  }
  AgregarEstudianteabandono(Estudianteabandono){
    return axios.post(this.ruta+'api/Estudianteabandono/',Estudianteabandono);
  }
  ModificarEstudianteabandono(Estudianteabandono,id){
    return axios.put(this.ruta+'api/Estudianteabandono/'+id,Estudianteabandono);
  }
  SeleccionarEstudianteabandono(id){
    return axios.get(this.ruta+'api/Estudianteabandono/'+id);
  }
  EliminarEstudianteabandono(id){
    return axios.delete(this.ruta+'api/Estudianteabandono/'+id);
  }
}
