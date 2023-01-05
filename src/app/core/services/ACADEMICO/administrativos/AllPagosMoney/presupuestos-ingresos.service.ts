import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosIngresosService {

  ruta=environment.service;
    constructor() { }
    ObtenerPresupuestosIngresos(){
      return axios.get(this.ruta+'api/PresupuestosIngreso/');
    }
    AgregarPresupuestosIngreso(PresupuestosIngreso){
      return axios.post(this.ruta+'api/PresupuestosIngreso/',PresupuestosIngreso);
    }
    ModificarPresupuestosIngreso(PresupuestosIngreso, id){
      return axios.put(this.ruta+'api/PresupuestosIngreso/'+id,PresupuestosIngreso);
    }
    SeleccionarPresupuestosIngreso(id){
      return axios.get(this.ruta+'api/PresupuestosIngreso/'+id);
    }
    EliminarPresupuestosIngreso(id){
      return axios.delete(this.ruta+'api/PresupuestosIngreso/'+id);
    }
}
