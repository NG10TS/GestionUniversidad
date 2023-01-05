import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosEgresosService {
ruta=environment.service;
  constructor() { }
  ObtenerPresupuestosEgresos(){
    return axios.get(this.ruta+'api/PresupuestosEgreso/');
  }
  AgregarPresupuestosEgreso(PresupuestosEgreso){
    return axios.post(this.ruta+'api/PresupuestosEgreso/',PresupuestosEgreso);
  }
  ModificarPresupuestosEgreso(PresupuestosEgreso, id){
    return axios.put(this.ruta+'api/PresupuestosEgreso/'+id,PresupuestosEgreso);
  }
  SeleccionarPresupuestosEgreso(id){
    return axios.get(this.ruta+'api/PresupuestosEgreso/'+id);
  }
  EliminarPresupuestosEgreso(id){
    return axios.delete(this.ruta+'api/PresupuestosEgreso/'+id);
  }
}
