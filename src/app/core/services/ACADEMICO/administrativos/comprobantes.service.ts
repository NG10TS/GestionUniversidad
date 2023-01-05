import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {
  ruta=environment.service;
    constructor() { }
    ObtenerComprobantes(){
      return axios.get(this.ruta+'api/Comprobante/');
    }
    AgregarComprobante(Comprobante){
      return axios.post(this.ruta+'api/Comprobante/',Comprobante);
    }
    ModificarComprobante(Comprobante, id){
      return axios.put(this.ruta+'api/Comprobante/'+id,Comprobante);
    }
    SeleccionarComprobante(id){
      return axios.get(this.ruta+'api/Comprobante/'+id);
    }
    EliminarComprobante(id){
      return axios.delete(this.ruta+'api/Comprobante/'+id);
    }
}
