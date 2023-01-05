import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  ruta=environment.service;
  constructor() { }
  ObtenerEventoss(){
    return axios.get(this.ruta+'api/Eventos/');
  }
  AgregarEventos(Eventos){
    return axios.post(this.ruta+'api/Eventos/',Eventos);
  }
  ModificarEventos(Eventos,id){
    return axios.post(this.ruta+'api/EventosUpdate/'+id,Eventos);
  }
  SeleccionarEventos(id){
    return axios.get(this.ruta+'api/Eventos/'+id);
  }
  EliminarEventos(id){
    return axios.delete(this.ruta+'api/Eventos/'+id);
  }
}
