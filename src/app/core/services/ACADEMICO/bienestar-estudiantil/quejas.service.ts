import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuejasService {
  ruta=environment.service;
  constructor() { }
  ObtenerQuejass(){
    return axios.get(this.ruta+'api/Quejas/');
  }
  AgregarQuejas(Quejas){
    return axios.post(this.ruta+'api/Quejas/',Quejas);
  }
  ModificarQuejas(Quejas,id){
    return axios.post(this.ruta+'api/QuejasUpdate/'+id,Quejas);
  }
  SeleccionarQuejas(id){
    return axios.get(this.ruta+'api/Quejas/'+id);
  }
  EliminarQuejas(id){
    return axios.delete(this.ruta+'api/Quejas/'+id);
  }
}
