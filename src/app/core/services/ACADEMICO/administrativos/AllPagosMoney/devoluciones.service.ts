import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  ruta=environment.service;
    constructor() { }
    ObtenerDevolucions(){
      return axios.get(this.ruta+'api/Devolucion/');
    }
    AgregarDevolucion(Devolucion){
      return axios.post(this.ruta+'api/Devolucion/',Devolucion);
    }
    ModificarDevolucion(Devolucion, id){
      return axios.put(this.ruta+'api/Devolucion/'+id,Devolucion);
    }
    SeleccionarDevolucion(id){
      return axios.get(this.ruta+'api/Devolucion/'+id);
    }
    EliminarDevolucion(id){
      return axios.delete(this.ruta+'api/Devolucion/'+id);
    }
}
