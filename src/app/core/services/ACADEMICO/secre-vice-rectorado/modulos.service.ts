import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  ruta=environment.service;
    constructor() { }
    ObtenerModulos(){
      return axios.get(this.ruta+'api/Modulo/');
    }
    AgregarModulo(Modulo){
      return axios.post(this.ruta+'api/Modulo/',Modulo);
    }
    ModificarModulo(Modulo, id){
      return axios.put(this.ruta+'api/Modulo/'+id,Modulo);
    }
    SeleccionarModulo(id){
      return axios.get(this.ruta+'api/Modulo/'+id);
    }
    EliminarModulo(id){
      return axios.delete(this.ruta+'api/Modulo/'+id);
    }
}
