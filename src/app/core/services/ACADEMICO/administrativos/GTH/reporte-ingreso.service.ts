import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReporteIngresoService {

  ruta=environment.service;
    constructor() { }
    ObtenerReporteIngreso(){
      return axios.get(this.ruta+'api/ReporteIngreso/');
    }
    AgregarReporteIngreso(ReporteIngreso){
      return axios.post(this.ruta+'api/ReporteIngreso/',ReporteIngreso);
    }
    ModificarReporteIngreso(ReporteIngreso, id){
      return axios.put(this.ruta+'api/ReporteIngreso/'+id,ReporteIngreso);
    }
    SeleccionarReporteIngreso(id){
      return axios.get(this.ruta+'api/ReporteIngreso/'+id);
    }
    EliminarReporteIngreso(id){
      return axios.delete(this.ruta+'api/ReporteIngreso/'+id);
    }
}
