import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositosService {

  ruta=environment.service;
    constructor() { }
    ObtenerDepositos(){
      return axios.get(this.ruta+'api/Depositos/');
    }
    AgregarDepositos(Depositos){
      return axios.post(this.ruta+'api/Depositos/',Depositos);
    }
    ModificarDepositos(Depositos, id){
      return axios.put(this.ruta+'api/Depositos/'+id,Depositos);
    }
    SeleccionarDepositos(id){
      return axios.get(this.ruta+'api/Depositos/'+id);
    }
    EliminarDepositos(id){
      return axios.delete(this.ruta+'api/Depositos/'+id);
    }
}
