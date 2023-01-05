import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerConvenio(){
    return axios.get(this.ruta+'api/Convenio/');
  }
  AgregarConvenio(Convenio){
    return axios.post(this.ruta+'api/Convenio/',Convenio);
  }
  ModificarConvenio(Convenio,id){
    return axios.post(this.ruta+'api/ConvenioUpdate/'+id,Convenio);
  }
  SeleccionarConvenio(id){
    return axios.get(this.ruta+'api/Convenio/'+id);
  }
  EliminarConvenio(id){
    return axios.delete(this.ruta+'api/Convenio/'+id);
  }

}
