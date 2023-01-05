import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisdocumentoService {

  ruta=environment.service;
  constructor() { }
  ObtenerRegisdocumentos(){
    return axios.get(this.ruta+'api/Regisdocumento/');
  }
  AgregarRegisdocumento(Regisdocumento){
    return axios.post(this.ruta+'api/Regisdocumento/',Regisdocumento);
  }
  ModificarRegisdocumento(Regisdocumento, id){
    return axios.post(this.ruta+'api/RegisdocumentoUpdate/'+id,Regisdocumento);
  }
  SeleccionarRegisdocumento(id){
    return axios.get(this.ruta+'api/Regisdocumento/'+id);
  }
  EliminarRegisdocumento(id){
    return axios.delete(this.ruta+'api/Regisdocumento/'+id);
  }

}
