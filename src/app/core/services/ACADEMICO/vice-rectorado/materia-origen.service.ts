import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaOrigenService {
  ruta=environment.service;
  constructor() { }
  ObtenerMatConvs(){
    return axios.get(this.ruta+'api/MatConv/');
  }
  AgregarMatConv(MatConv){
    return axios.post(this.ruta+'api/MatConv/',MatConv);
  }
  ModificarMatConv(MatConv, id){
    return axios.put(this.ruta+'api/MatConv/'+id,MatConv);
  }
  SeleccionarMatConv(id){
    return axios.get(this.ruta+'api/MatConv/'+id);
  }
  EliminarMatConv(id){
    return axios.delete(this.ruta+'api/MatConv/'+id);
  }
}
