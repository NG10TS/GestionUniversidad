import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancosService {

  ruta=environment.service;
    constructor() { }
    ObtenerCuentaBancos(){
      return axios.get(this.ruta+'api/CuentaBanco/');
    }
    AgregarCuentaBanco(CuentaBanco){
      return axios.post(this.ruta+'api/CuentaBanco/',CuentaBanco);
    }
    ModificarCuentaBanco(CuentaBanco, id){
      return axios.put(this.ruta+'api/CuentaBanco/'+id,CuentaBanco);
    }
    SeleccionarCuentaBanco(id){
      return axios.get(this.ruta+'api/CuentaBanco/'+id);
    }
    EliminarCuentaBanco(id){
      return axios.delete(this.ruta+'api/CuentaBanco/'+id);
    }
}
