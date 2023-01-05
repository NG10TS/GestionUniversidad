import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillasadminService {
  ruta=environment.service;
    constructor() { }
    ObtenerPlanillaAdmins(){
      return axios.get(this.ruta+'api/PlanillaAdmin/');
    }
    AgregarPlanillaAdmin(PlanillaAdmin){
      return axios.post(this.ruta+'api/PlanillaAdmin/',PlanillaAdmin);
    }
    ModificarPlanillaAdmin(PlanillaAdmin, id){
      return axios.put(this.ruta+'api/PlanillaAdmin/'+id,PlanillaAdmin);
    }
    SeleccionarPlanillaAdmin(id){
      return axios.get(this.ruta+'api/PlanillaAdmin/'+id);
    }
    EliminarPlanillaAdmin(id){
      return axios.delete(this.ruta+'api/PlanillaAdmin/'+id);
    }
}
