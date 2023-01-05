import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteEgresosService {

    ruta=environment.service;
      constructor() { }
      ObtenerReporteEgresos(){
        return axios.get(this.ruta+'api/ReporteEgreso/');
      }
      AgregarReporteEgreso(ReporteEgreso){
        return axios.post(this.ruta+'api/ReporteEgreso/',ReporteEgreso);
      }
      ModificarReporteEgreso(ReporteEgreso, id){
        return axios.put(this.ruta+'api/ReporteEgreso/'+id,ReporteEgreso);
      }
      SeleccionarReporteEgreso(id){
        return axios.get(this.ruta+'api/ReporteEgreso/'+id);
      }
      EliminarReporteEgreso(id){
        return axios.delete(this.ruta+'api/ReporteEgreso/'+id);
      }
}
