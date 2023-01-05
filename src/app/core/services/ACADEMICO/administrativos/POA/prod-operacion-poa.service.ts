import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdOperacionPoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerProdOperacionPoas(){
      return axios.get(this.ruta+'api/ProdOperacionPoa/');
    }
    AgregarProdOperacionPoa(ProdOperacionPoa){
      return axios.post(this.ruta+'api/ProdOperacionPoa/',ProdOperacionPoa);
    }
    ModificarProdOperacionPoa(ProdOperacionPoa, id){
      return axios.put(this.ruta+'api/ProdOperacionPoa/'+id,ProdOperacionPoa);
    }
    SeleccionarProdOperacionPoa(id){
      return axios.get(this.ruta+'api/ProdOperacionPoa/'+id);
    }
    EliminarProdOperacionPoa(id){
      return axios.delete(this.ruta+'api/ProdOperacionPoa/'+id);
    }
}
