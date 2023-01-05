 import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionesService {
  ruta=environment.service;
    constructor() { }
    ObtenerGestions(){
      return axios.get(this.ruta+'api/Gestion/');
    }
    AgregarGestion(Gestion){
      return axios.post(this.ruta+'api/Gestion/',Gestion);
    }
    ModificarGestion(Gestion, id){
      return axios.put(this.ruta+'api/Gestion/'+id,Gestion);
    }
    SeleccionarGestion(id){
      return axios.get(this.ruta+'api/Gestion/'+id);
    }
    EliminarGestion(id){
      return axios.delete(this.ruta+'api/Gestion/'+id);
    }
}
