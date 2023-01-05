import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanPagosService {

  ruta=environment.service;
    constructor() { }
    ObtenerPlanPagos(){
      return axios.get(this.ruta+'api/PlanPago/');
    }
    AgregarPlanPago(PlanPago){
      return axios.post(this.ruta+'api/PlanPago/',PlanPago);
    }
    ModificarPlanPago(PlanPago, id){
      return axios.put(this.ruta+'api/PlanPago/'+id,PlanPago);
    }
    SeleccionarPlanPago(id){
      return axios.get(this.ruta+'api/PlanPago/'+id);
    }
    EliminarPlanPago(id){
      return axios.delete(this.ruta+'api/PlanPago/'+id);
    }
}
