import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeudasService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerDeudas(){
    return axios.get(this.ruta+'api/Deudas/');
  }
  AgregarDeudas(Deudas){
    return axios.post(this.ruta+'api/Deudas/',Deudas);
  }
  ModificarDeudas(Deudas,id){
    return axios.post(this.ruta+'api/DeudasUpdate/'+id,Deudas);
  }
  SeleccionarDeudas(id){
    return axios.get(this.ruta+'api/Deudas/'+id);
  }
  EliminarDeudas(id){
    return axios.delete(this.ruta+'api/Deudas/'+id);
  }

}
