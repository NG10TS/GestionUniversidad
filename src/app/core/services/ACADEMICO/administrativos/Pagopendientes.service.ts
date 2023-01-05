import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagopendientesService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPagopendientes(){
    return axios.get(this.ruta+'api/Pagopendientes/');
  }
  AgregarPagopendientes(Pagopendientes){
    return axios.post(this.ruta+'api/Pagopendientes/',Pagopendientes);
  }
  ModificarPagopendientes(Pagopendientes,id){
    return axios.post(this.ruta+'api/PagopendientesUpdate/'+id,Pagopendientes);
  }
  SeleccionarPagopendientes(id){
    return axios.get(this.ruta+'api/Pagopendientes/'+id);
  }
  EliminarPagopendientes(id){
    return axios.delete(this.ruta+'api/Pagopendientes/'+id);
  }

}
