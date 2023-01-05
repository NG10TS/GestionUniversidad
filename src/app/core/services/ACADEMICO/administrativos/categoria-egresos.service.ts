import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEgresosService {
  ruta=environment.service;
    constructor() { }
    ObtenerCategoriaEgresos(){
      return axios.get(this.ruta+'api/CategoriaEgreso/');
    }
    AgregarCategoriaEgreso(CategoriaEgreso){
      return axios.post(this.ruta+'api/CategoriaEgreso/',CategoriaEgreso);
    }
    ModificarCategoriaEgreso(CategoriaEgreso, id){
      return axios.put(this.ruta+'api/CategoriaEgreso/'+id,CategoriaEgreso);
    }
    SeleccionarCategoriaEgreso(id){
      return axios.get(this.ruta+'api/CategoriaEgreso/'+id);
    }
    EliminarCategoriaEgreso(id){
      return axios.delete(this.ruta+'api/CategoriaEgreso/'+id);
    }
}
