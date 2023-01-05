import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenvencimientoService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerVenvencimiento(){
    return axios.get(this.ruta+'api/Venvencimiento/');
  }
  AgregarVenvencimiento(Venvencimiento){
    return axios.post(this.ruta+'api/Venvencimiento/',Venvencimiento);
  }
  ModificarVenvencimiento(Venvencimiento,id){
    return axios.post(this.ruta+'api/VenvencimientoUpdate/'+id,Venvencimiento);
  }
  SeleccionarVenvencimiento(id){
    return axios.get(this.ruta+'api/Venvencimiento/'+id);
  }
  EliminarVenvencimiento(id){
    return axios.delete(this.ruta+'api/Venvencimiento/'+id);
  }

}
