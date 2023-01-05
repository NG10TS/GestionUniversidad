import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanpagoService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPlanpago(){
    return axios.get(this.ruta+'api/Planpago/');
  }
  AgregarPlanpago(Planpago){
    return axios.post(this.ruta+'api/Planpago/',Planpago);
  }
  ModificarPlanpago(Planpago,id){
    return axios.post(this.ruta+'api/PlanpagoUpdate/'+id,Planpago);
  }
  SeleccionarPlanpago(id){
    return axios.get(this.ruta+'api/Planpago/'+id);
  }
  EliminarPlanpago(id){
    return axios.delete(this.ruta+'api/Planpago/'+id);
  }

}
