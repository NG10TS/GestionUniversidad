import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NuevoPoaService {
  
  ruta=environment.service;
    constructor() { }
    ObtenerNuevoPoas(){
      return axios.get(this.ruta+'api/NuevoPoa/');
    }
    AgregarNuevoPoa(NuevoPoa){
      return axios.post(this.ruta+'api/NuevoPoa/',NuevoPoa);
    }
    ModificarNuevoPoa(NuevoPoa, id){
      return axios.put(this.ruta+'api/NuevoPoa/'+id,NuevoPoa);
    }
    SeleccionarNuevoPoa(id){
      return axios.get(this.ruta+'api/NuevoPoa/'+id);
    }
    EliminarNuevoPoa(id){
      return axios.delete(this.ruta+'api/NuevoPoa/'+id);
    }
}
