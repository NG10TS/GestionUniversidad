import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
    ruta=environment.service;
      constructor() { }
      ObtenerArticulos(){
        return axios.get(this.ruta+'api/Articulo/');
      }
      AgregarArticulo(Articulo){
        return axios.post(this.ruta+'api/Articulo/',Articulo);
      }
      ModificarArticulo(Articulo, id){
        return axios.put(this.ruta+'api/Articulo/'+id,Articulo);
      }
      SeleccionarArticulo(id){
        return axios.get(this.ruta+'api/Articulo/'+id);
      }
      EliminarArticulo(id){
        return axios.delete(this.ruta+'api/Articulo/'+id);
      }
}
