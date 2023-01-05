import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasEvaluasService {
  ruta=environment.service;
  constructor() { }
  ObtenerNotasEvaluas(){
    return axios.get(this.ruta+'api/NotasEvaluas/');
  }
  AgregarNotasEvaluas(NotasEvaluas){
    return axios.post(this.ruta+'api/NotasEvaluas/',NotasEvaluas);
  }
  ModificarNotasEvaluas(NotasEvaluas,id){
    return axios.post(this.ruta+'api/NotasEvaluasUpdate/'+id,NotasEvaluas);
  }
  SeleccionarNotasEvaluas(id){
    return axios.get(this.ruta+'api/NotasEvaluas/'+id);
  }
  EliminarNotasEvaluas(id){
    return axios.delete(this.ruta+'api/NotasEvaluas/'+id);
  }
}
