import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlandeudaService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPlandeuda(){
    return axios.get(this.ruta+'api/Plandeuda/');
  }
  AgregarPlandeuda(Plandeuda){
    return axios.post(this.ruta+'api/Plandeuda/',Plandeuda);
  }
  ModificarPlandeuda(Plandeuda,id){
    return axios.post(this.ruta+'api/PlandeudaUpdate/'+id,Plandeuda);
  }
  SeleccionarPlandeuda(id){
    return axios.get(this.ruta+'api/Plandeuda/'+id);
  }
  EliminarPlandeuda(id){
    return axios.delete(this.ruta+'api/Plandeuda/'+id);
  }

}
