import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanPagoProyeccionesService {
ruta=environment.service;
  constructor() { }
  ObtenerPlanPagoProyeccions(){
    return axios.get(this.ruta+'api/PlanPagoProyeccion/');
  }
  AgregarPlanPagoProyeccion(PlanPagoProyeccion){
    return axios.post(this.ruta+'api/PlanPagoProyeccion/',PlanPagoProyeccion);
  }
  ModificarPlanPagoProyeccion(PlanPagoProyeccion, id){
    return axios.put(this.ruta+'api/PlanPagoProyeccion/'+id,PlanPagoProyeccion);
  }
  SeleccionarPlanPagoProyeccion(id){
    return axios.get(this.ruta+'api/PlanPagoProyeccion/'+id);
  }
  EliminarPlanPagoProyeccion(id){
    return axios.delete(this.ruta+'api/PlanPagoProyeccion/'+id);
  }
}
