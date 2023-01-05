import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerPoas(){
      return axios.get(this.ruta+'api/Poa/');
    }
    AgregarPoa(Poa){
      return axios.post(this.ruta+'api/Poa/',Poa);
    }
    ModificarPoa(Poa, id){
      return axios.put(this.ruta+'api/Poa/'+id,Poa);
    }
    SeleccionarPoa(id){
      return axios.get(this.ruta+'api/Poa/'+id);
    }
    EliminarPoa(id){
      return axios.delete(this.ruta+'api/Poa/'+id);
    }
}
