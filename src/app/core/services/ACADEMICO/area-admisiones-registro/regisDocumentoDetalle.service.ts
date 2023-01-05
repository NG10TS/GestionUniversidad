import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisDocumentoDetalleService {
  ruta=environment.service;
  constructor() { }
  ObtenerRegistroDocumentoDetalles(){
    return axios.get(this.ruta+'api/RegistroDocumentoDetalle/');
  }
  AgregarRegistroDocumentoDetalle(RegistroDocumentoDetalle){
    return axios.post(this.ruta+'api/RegistroDocumentoDetalle/',RegistroDocumentoDetalle);
  }
  ModificarRegistroDocumentoDetalle(RegistroDocumentoDetalle, id){
    return axios.post(this.ruta+'api/RegistroDocumentoDetalleUpdate/'+id,RegistroDocumentoDetalle);
  }
  SeleccionarRegistroDocumentoDetalle(id){
    return axios.get(this.ruta+'api/RegistroDocumentoDetalle/'+id);
  }
  EliminarRegistroDocumentoDetalle(id){
    return axios.delete(this.ruta+'api/RegistroDocumentoDetalle/'+id);
  }

}
