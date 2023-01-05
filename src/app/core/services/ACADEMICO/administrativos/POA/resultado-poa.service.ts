import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultadoPoaService {
  ruta=environment.service;
    constructor() { }
    ObtenerResultadoPoas(){
      return axios.get(this.ruta+'api/ResultadoPoa/');
    }
    AgregarResultadoPoa(ResultadoPoa){
      return axios.post(this.ruta+'api/ResultadoPoa/',ResultadoPoa);
    }
    ModificarResultadoPoa(ResultadoPoa, id){
      return axios.put(this.ruta+'api/ResultadoPoa/'+id,ResultadoPoa);
    }
    SeleccionarResultadoPoa(id){
      return axios.get(this.ruta+'api/ResultadoPoa/'+id);
    }
    EliminarResultadoPoa(id){
      return axios.delete(this.ruta+'api/ResultadoPoa/'+id);
    }
}
