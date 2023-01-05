import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaIngresoService {

  ruta=environment.service;
    constructor() { }
    ObtenerListaIngreso(){
      return axios.get(this.ruta+'api/ListaIngreso/');
    }
    AgregarListaIngreso(ListaIngreso){
      return axios.post(this.ruta+'api/ListaIngreso/',ListaIngreso);
    }
    ModificarListaIngreso(ListaIngreso, id){
      return axios.put(this.ruta+'api/ListaIngreso/'+id,ListaIngreso);
    }
    SeleccionarListaIngreso(id){
      return axios.get(this.ruta+'api/ListaIngreso/'+id);
    }
    EliminarListaIngreso(id){
      return axios.delete(this.ruta+'api/ListaIngreso/'+id);
    }
}
