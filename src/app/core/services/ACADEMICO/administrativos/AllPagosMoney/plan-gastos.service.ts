import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanGastosService {
ruta=environment.service;
  constructor() { }
  ObtenerPlanGastos(){
    return axios.get(this.ruta+'api/PlanGasto/');
  }
  AgregarPlanGasto(PlanGasto){
    return axios.post(this.ruta+'api/PlanGasto/',PlanGasto);
  }
  ModificarPlanGasto(PlanGasto, id){
    return axios.put(this.ruta+'api/PlanGasto/'+id,PlanGasto);
  }
  SeleccionarPlanGasto(id){
    return axios.get(this.ruta+'api/PlanGasto/'+id);
  }
  EliminarPlanGasto(id){
    return axios.delete(this.ruta+'api/PlanGasto/'+id);
  }
}
