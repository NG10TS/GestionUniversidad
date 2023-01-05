import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  ruta=environment.service;
    constructor() { }
    ObtenerCuentas(){
      return axios.get(this.ruta+'api/Cuenta/');
    }
    AgregarCuenta(Cuenta){
      return axios.post(this.ruta+'api/Cuenta/',Cuenta);
    }
    ModificarCuenta(Cuenta, id){
      return axios.put(this.ruta+'api/Cuenta/'+id,Cuenta);
    }
    SeleccionarCuenta(id){
      return axios.get(this.ruta+'api/Cuenta/'+id);
    }
    EliminarCuenta(id){
      return axios.delete(this.ruta+'api/Cuenta/'+id);
    }
    EncontrarCuenta(nroCuenta){
      return axios.get(this.ruta+'api/BuscarCuenta/',nroCuenta);
    }
}
