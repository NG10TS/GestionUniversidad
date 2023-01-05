import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillaAdminsService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPlanillaAdmins(){
    return axios.get(this.ruta+'api/PlanillaAdmins/');
  }
  AgregarPlanillaAdmins(PlanillaAdmins){
    return axios.post(this.ruta+'api/PlanillaAdmins/',PlanillaAdmins);
  }
  ModificarPlanillaAdmins(PlanillaAdmins,id){
    return axios.post(this.ruta+'api/PlanillaAdminsUpdate/'+id,PlanillaAdmins);
  }
  SeleccionarPlanillaAdmins(id){
    return axios.get(this.ruta+'api/PlanillaAdmins/'+id);
  }
  EliminarPlanillaAdmins(id){
    return axios.delete(this.ruta+'api/PlanillaAdmins/'+id);
  }

}
