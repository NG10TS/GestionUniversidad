import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {
  ruta=environment.service;
    constructor() { }
    ObtenerAlmacenes(){
      return axios.get(this.ruta+'api/Almacen/');
    }
    AgregarAlmacen(Almacen){
      return axios.post(this.ruta+'api/Almacen/',Almacen);
    }
    ModificarAlmacen(Almacen, id){
      return axios.put(this.ruta+'api/Almacen/'+id,Almacen);
    }
    SeleccionarAlmacen(id){
      return axios.get(this.ruta+'api/Almacen/'+id);
    }
    EliminarAlmacen(id){
      return axios.delete(this.ruta+'api/Almacen/'+id);
    }
}
