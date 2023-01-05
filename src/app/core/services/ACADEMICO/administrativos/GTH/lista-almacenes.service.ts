import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaAlmacenesService {

  ruta=environment.service;
    constructor() { }
    ObtenerListaAlmacenes(){
      return axios.get(this.ruta+'api/ListaAlmacen/');
    }
    AgregarListaAlmacen(ListaAlmacen){
      return axios.post(this.ruta+'api/ListaAlmacen/',ListaAlmacen);
    }
    ModificarListaAlmacen(ListaAlmacen, id){
      return axios.put(this.ruta+'api/ListaAlmacen/'+id,ListaAlmacen);
    }
    SeleccionarListaAlmacen(id){
      return axios.get(this.ruta+'api/ListaAlmacen/'+id);
    }
    EliminarListaAlmacen(id){
      return axios.delete(this.ruta+'api/ListaAlmacen/'+id);
    }
}
