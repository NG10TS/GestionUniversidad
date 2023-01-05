import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerCarreras(){
    return axios.get(this.ruta+'api/Carrera/');
  }
  AgregarCarrera(Carrera){
    return axios.post(this.ruta+'api/Carrera/',Carrera);
  }
  ModificarCarrera(Carrera,id){
    return axios.post(this.ruta+'api/CarreraUpdate/'+id,Carrera);
  }
  SeleccionarCarrera(id){
    return axios.get(this.ruta+'api/Carrera/'+id);
  }
  EliminarCarrera(id){
    return axios.delete(this.ruta+'api/Carrera/'+id);
  }

  ObternerCarreraEstudiante(id){
    return axios.get(this.ruta+'api/GetCarreraEst/'+id)
  }
}
