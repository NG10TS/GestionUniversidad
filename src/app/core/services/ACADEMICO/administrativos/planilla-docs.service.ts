import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillaDocsService {

  ruta=environment.service;
    constructor() { }
    ObtenerPlanillaDocs(){
      return axios.get(this.ruta+'api/PlanillaDoc/');
    }
    AgregarPlanillaDoc(PlanillaDoc){
      return axios.post(this.ruta+'api/PlanillaDoc/',PlanillaDoc);
    }
    ModificarPlanillaDoc(PlanillaDoc, id){
      return axios.put(this.ruta+'api/PlanillaDoc/'+id,PlanillaDoc);
    }
    SeleccionarPlanillaDoc(id){
      return axios.get(this.ruta+'api/PlanillaDoc/'+id);
    }
    EliminarPlanillaDoc(id){
      return axios.delete(this.ruta+'api/PlanillaDoc/'+id);
    }
}
