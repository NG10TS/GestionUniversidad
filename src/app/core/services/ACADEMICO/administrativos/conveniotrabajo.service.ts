import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConveniotrabajoService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerConveniotrabajo(){
    return axios.get(this.ruta+'api/Conveniotrabajo/');
  }
  AgregarConveniotrabajo(Conveniotrabajo){
    return axios.post(this.ruta+'api/Conveniotrabajo/',Conveniotrabajo);
  }
  ModificarConveniotrabajo(Conveniotrabajo,id){
    return axios.post(this.ruta+'api/ConveniotrabajoUpdate/'+id,Conveniotrabajo);
  }
  SeleccionarConveniotrabajo(id){
    return axios.get(this.ruta+'api/Conveniotrabajo/'+id);
  }
  EliminarConveniotrabajo(id){
    return axios.delete(this.ruta+'api/Conveniotrabajo/'+id);
  }

}
