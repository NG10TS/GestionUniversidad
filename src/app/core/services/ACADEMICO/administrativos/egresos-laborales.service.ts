import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresosLaboralesService {

  ruta=environment.service;
    constructor() { }
    ObtenerEgresoLaboral(){
      return axios.get(this.ruta+'api/EgresoLaboral/');
    }
    AgregarEgresoLaboral(EgresoLaboral){
      return axios.post(this.ruta+'api/EgresoLaboral/',EgresoLaboral);
    }
    ModificarEgresoLaboral(EgresoLaboral, id){
      return axios.put(this.ruta+'api/EgresoLaboral/'+id,EgresoLaboral);
    }
    SeleccionarEgresoLaboral(id){
      return axios.get(this.ruta+'api/EgresoLaboral/'+id);
    }
    EliminarEgresoLaboral(id){
      return axios.delete(this.ruta+'api/EgresoLaboral/'+id);
    }
}
