import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaspendientesService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerMateriaspendientes(){
    return axios.get(this.ruta+'api/Materiaspendientes/');
  }
  AgregarMateriaspendientes(Materiaspendientes){
    return axios.post(this.ruta+'api/Materiaspendientes/',Materiaspendientes);
  }
  ModificarMateriaspendientes(Materiaspendientes,id){
    return axios.post(this.ruta+'api/MateriaspendientesUpdate/'+id,Materiaspendientes);
  }
  SeleccionarMateriaspendientes(id){
    return axios.get(this.ruta+'api/Materiaspendientes/'+id);
  }
  EliminarMateriaspendientes(id){
    return axios.delete(this.ruta+'api/Materiaspendientes/'+id);
  }

}
