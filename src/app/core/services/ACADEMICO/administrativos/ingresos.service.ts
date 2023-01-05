import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  ruta=environment.service;
    constructor() { }
    ObtenerIngresos(){
      return axios.get(this.ruta+'api/Ingreso/');
    }
    AgregarIngreso(Ingreso){
      return axios.post(this.ruta+'api/Ingreso/',Ingreso);
    }
    ModificarIngreso(Ingreso, id){
      return axios.put(this.ruta+'api/Ingreso/'+id,Ingreso);
    }
    SeleccionarIngreso(id){
      return axios.get(this.ruta+'api/Ingreso/'+id);
    }
    EliminarIngreso(id){
      return axios.delete(this.ruta+'api/Ingreso/'+id);
    }
}
