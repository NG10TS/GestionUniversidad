import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CateProductoPoaService {

  ruta=environment.service;
    constructor() { }
    ObtenerCateProductoPoas(){
      return axios.get(this.ruta+'api/CateProductoPoa/');
    }
    AgregarCateProductoPoa(CateProductoPoa){
      return axios.post(this.ruta+'api/CateProductoPoa/',CateProductoPoa);
    }
    ModificarCateProductoPoa(CateProductoPoa, id){
      return axios.put(this.ruta+'api/CateProductoPoa/'+id,CateProductoPoa);
    }
    SeleccionarCateProductoPoa(id){
      return axios.get(this.ruta+'api/CateProductoPoa/'+id);
    }
    EliminarCateProductoPoa(id){
      return axios.delete(this.ruta+'api/CateProductoPoa/'+id);
    }
}
