
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagopendestService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPagopendest(){
    return axios.get(this.ruta+'api/Pagopendest/');
  }
  AgregarPagopendest(Pagopendest){
    return axios.post(this.ruta+'api/Pagopendest/',Pagopendest);
  }
  ModificarPagopendest(Pagopendest,id){
    return axios.post(this.ruta+'api/PagopendestUpdate/'+id,Pagopendest);
  }
  SeleccionarPagopendest(id){
    return axios.get(this.ruta+'api/Pagopendest/'+id);
  }
  EliminarPagopendest(id){
    return axios.delete(this.ruta+'api/Pagopendest/'+id);
  }

}
