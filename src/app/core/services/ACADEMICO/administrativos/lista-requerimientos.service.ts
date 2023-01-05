import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaRequerimientosService {
    ruta=environment.service;
      constructor() { }
      ObtenerListaRequerimientos(){
        return axios.get(this.ruta+'api/ListaRequerimiento/');
      }
      AgregarListaRequerimiento(ListaRequerimiento){
        return axios.post(this.ruta+'api/ListaRequerimiento/',ListaRequerimiento);
      }
      ModificarListaRequerimiento(ListaRequerimiento, id){
        return axios.put(this.ruta+'api/ListaRequerimiento/'+id,ListaRequerimiento);
      }
      SeleccionarListaRequerimiento(id){
        return axios.get(this.ruta+'api/ListaRequerimiento/'+id);
      }
      EliminarListaRequerimiento(id){
        return axios.delete(this.ruta+'api/ListaRequerimiento/'+id);
      }
}
