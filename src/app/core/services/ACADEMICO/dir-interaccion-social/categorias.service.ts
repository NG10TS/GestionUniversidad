import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  ruta=environment.service;
  constructor() { }
  ObtenerCategorias(){
    return axios.get(this.ruta+'api/Categorias/');
  }
  AgregarCategorias(Categorias){
    return axios.post(this.ruta+'api/Categorias/',Categorias);
  }
  ModificarCategorias(Categorias,id){
    return axios.put(this.ruta+'api/Categorias/'+id,Categorias);
  }
  SeleccionarCategorias(id){
    return axios.get(this.ruta+'api/Categorias/'+id);
  }
  EliminarCategorias(id){
    return axios.delete(this.ruta+'api/Categorias/'+id);
  }
}
