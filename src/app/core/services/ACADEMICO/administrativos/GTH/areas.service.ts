import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  ruta=environment.service;
    constructor() { }
    ObtenerAreas(){
      return axios.get(this.ruta+'api/Area/');
    }
    AgregarArea(Area){
      return axios.post(this.ruta+'api/Area/',Area);
    }
    ModificarArea(Area, id){
      return axios.put(this.ruta+'api/Area/'+id,Area);
    }
    SeleccionarArea(id){
      return axios.get(this.ruta+'api/Area/'+id);
    }
    EliminarArea(id){
      return axios.delete(this.ruta+'api/Area/'+id);
    }
}
