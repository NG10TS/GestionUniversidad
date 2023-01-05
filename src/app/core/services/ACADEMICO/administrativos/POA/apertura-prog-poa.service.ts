import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AperturaProgPoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerAperturaProgPoas(){
      return axios.get(this.ruta+'api/AperturaProgPoa/');
    }
    AgregarAperturaProgPoa(AperturaProgPoa){
      return axios.post(this.ruta+'api/AperturaProgPoa/',AperturaProgPoa);
    }
    ModificarAperturaProgPoa(AperturaProgPoa, id){
      return axios.put(this.ruta+'api/AperturaProgPoa/'+id,AperturaProgPoa);
    }
    SeleccionarAperturaProgPoa(id){
      return axios.get(this.ruta+'api/AperturaProgPoa/'+id);
    }
    EliminarAperturaProgPoa(id){
      return axios.delete(this.ruta+'api/AperturaProgPoa/'+id);
    }
}
