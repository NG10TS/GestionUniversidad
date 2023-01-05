import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoDetalleEstsService {

  ruta=environment.service;
    constructor() { }
    ObtenerPagoDetalleEsts(){
      return axios.get(this.ruta+'api/PagoDetalleEst/');
    }
    AgregarPagoDetalleEst(PagoDetalleEst){
      return axios.post(this.ruta+'api/PagoDetalleEst/',PagoDetalleEst);
    }
    ModificarPagoDetalleEst(PagoDetalleEst, id){
      return axios.put(this.ruta+'api/PagoDetalleEst/'+id,PagoDetalleEst);
    }
    SeleccionarPagoDetalleEst(id){
      return axios.get(this.ruta+'api/PagoDetalleEst/'+id);
    }
    EliminarPagoDetalleEst(id){
      return axios.delete(this.ruta+'api/PagoDetalleEst/'+id);
    }
}
