import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolucionconvenioService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerResolucionconvenio(){
    return axios.get(this.ruta+'api/Resolucionconvenio/');
  }
  AgregarResolucionconvenio(Resolucionconvenio){
    return axios.post(this.ruta+'api/Resolucionconvenio/',Resolucionconvenio);
  }
  ModificarResolucionconvenio(Resolucionconvenio,id){
    return axios.post(this.ruta+'api/ResolucionconvenioUpdate/'+id,Resolucionconvenio);
  }
  SeleccionarResolucionconvenio(id){
    return axios.get(this.ruta+'api/Resolucionconvenio/'+id);
  }
  EliminarResolucionconvenio(id){
    return axios.delete(this.ruta+'api/Resolucionconvenio/'+id);
  }

}
