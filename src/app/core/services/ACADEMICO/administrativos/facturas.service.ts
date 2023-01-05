import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerFacturas(){
    return axios.get(this.ruta+'api/Facturas/');
  }
  AgregarFacturas(Facturas){
    return axios.post(this.ruta+'api/Facturas/',Facturas);
  }
  ModificarFacturas(Facturas,id){
    return axios.post(this.ruta+'api/FacturasUpdate/'+id,Facturas);
  }
  SeleccionarFacturas(id){
    return axios.get(this.ruta+'api/Facturas/'+id);
  }
  EliminarFacturas(id){
    return axios.delete(this.ruta+'api/Facturas/'+id);
  }

}
