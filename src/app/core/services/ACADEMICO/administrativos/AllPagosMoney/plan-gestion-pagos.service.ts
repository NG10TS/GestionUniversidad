import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanGestionPagosService {

  ruta=environment.service;
    constructor() { }
    ObtenerPlanGestionPagos(){
      return axios.get(this.ruta+'api/PlanGestionPago/');
    }
    AgregarPlanGestionPago(PlanGestionPago){
      return axios.post(this.ruta+'api/PlanGestionPago/',PlanGestionPago);
    }
    ModificarPlanGestionPago(PlanGestionPago, id){
      return axios.put(this.ruta+'api/PlanGestionPago/'+id,PlanGestionPago);
    }
    SeleccionarPlanGestionPago(id){
      return axios.get(this.ruta+'api/PlanGestionPago/'+id);
    }
    EliminarPlanGestionPago(id){
      return axios.delete(this.ruta+'api/PlanGestionPago/'+id);
    }
}
