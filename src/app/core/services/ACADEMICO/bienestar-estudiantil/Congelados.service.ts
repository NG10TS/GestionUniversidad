import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeladosService {
  ruta=environment.service;
  constructor() { }
  ObtenerCongeladoss(){
    return axios.get(this.ruta+'api/Congelados/');
  }
  AgregarCongelados(Congelados){
    return axios.post(this.ruta+'api/Congelados/',Congelados);
  }
  ModificarCongelados(Congelados,id){
    return axios.post(this.ruta+'api/CongeladosUpdate/'+id,Congelados);
  }
  SeleccionarCongelados(id){
    return axios.get(this.ruta+'api/Congelados/'+id);
  }
  EliminarCongelados(id){
    return axios.delete(this.ruta+'api/Congelados/'+id);
  }
}
