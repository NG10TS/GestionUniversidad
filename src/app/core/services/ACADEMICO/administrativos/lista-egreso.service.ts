import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaEgresoService {
  ruta=environment.service;
    constructor() { }
    ObtenerListaEgresos(){
      return axios.get(this.ruta+'api/ListaEgreso/');
    }
    AgregarListaEgreso(ListaEgreso){
      return axios.post(this.ruta+'api/ListaEgreso/',ListaEgreso);
    }
    ModificarListaEgreso(ListaEgreso, id){
      return axios.put(this.ruta+'api/ListaEgreso/'+id,ListaEgreso);
    }
    SeleccionarListaEgreso(id){
      return axios.get(this.ruta+'api/ListaEgreso/'+id);
    }
    EliminarListaEgreso(id){
      return axios.delete(this.ruta+'api/ListaEgreso/'+id);
    }
}
