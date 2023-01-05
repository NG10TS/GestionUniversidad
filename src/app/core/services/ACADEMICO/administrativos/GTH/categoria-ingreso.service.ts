import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaIngresoService {

  ruta=environment.service;
    constructor() { }
    ObtenerCategoriaIngreso(){
      return axios.get(this.ruta+'api/CategoriaIngreso/');
    }
    AgregarCategoriaIngreso(CategoriaIngreso){
      return axios.post(this.ruta+'api/CategoriaIngreso/',CategoriaIngreso);
    }
    ModificarCategoriaIngreso(CategoriaIngreso, id){
      return axios.put(this.ruta+'api/CategoriaIngreso/'+id,CategoriaIngreso);
    }
    SeleccionarCategoriaIngreso(id){
      return axios.get(this.ruta+'api/CategoriaIngreso/'+id);
    }
    EliminarCategoriaIngreso(id){
      return axios.delete(this.ruta+'api/CategoriaIngreso/'+id);
    }
}
