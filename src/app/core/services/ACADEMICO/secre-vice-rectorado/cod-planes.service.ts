import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodPlanesService {
  ruta=environment.service;
  constructor() { }
  ObtenerPlanes(){
    return axios.get(this.ruta+'api/Planes/');
  }
  AgregarPlanes(Planes){
    return axios.post(this.ruta+'api/Planes/',Planes);
  }
  ModificarPlanes(Planes,id){
    return axios.post(this.ruta+'api/PlanesUpdate/'+id,Planes);
  }
  SeleccionarPlanes(id){
    return axios.get(this.ruta+'api/Planes/'+id);
  }
  EliminarPlanes(id){
    return axios.delete(this.ruta+'api/Planes/'+id);
  }
}
