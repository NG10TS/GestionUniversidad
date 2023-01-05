import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FechaEvaluasService {
  ruta=environment.service;
  constructor() { }
  ObtenerFechaEvaluas(){
    return axios.get(this.ruta+'api/FechaEvaluas/');
  }
  AgregarFechaEvaluas(FechaEvaluas){
    return axios.post(this.ruta+'api/FechaEvaluas/',FechaEvaluas);
  }
  ModificarFechaEvaluas(FechaEvaluas,id){
    return axios.post(this.ruta+'api/FechaEvaluasUpdate/'+id,FechaEvaluas);
  }
  SeleccionarFechaEvaluas(id){
    return axios.get(this.ruta+'api/FechaEvaluas/'+id);
  }
  EliminarFechaEvaluas(id){
    return axios.delete(this.ruta+'api/FechaEvaluas/'+id);
  }
}
