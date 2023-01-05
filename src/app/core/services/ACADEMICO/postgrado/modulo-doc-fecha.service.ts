import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloDocFechaService {

  ruta=environment.service;
    constructor() { }
    ObtenerModuloDocFecha(){
      return axios.get(this.ruta+'api/ModuloDocFecha/');
    }
    AgregarModuloDocFecha(ModuloDocFecha){
      return axios.post(this.ruta+'api/ModuloDocFecha/',ModuloDocFecha);
    }
    ModificarModuloDocFecha(ModuloDocFecha, id){
      return axios.put(this.ruta+'api/ModuloDocFecha/'+id,ModuloDocFecha);
    }
    SeleccionarModuloDocFecha(id){
      return axios.get(this.ruta+'api/ModuloDocFecha/'+id);
    }
    EliminarModuloDocFecha(id){
      return axios.delete(this.ruta+'api/ModuloDocFecha/'+id);
    }
}
