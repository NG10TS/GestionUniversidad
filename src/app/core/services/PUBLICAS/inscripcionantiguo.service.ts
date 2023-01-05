import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionantiguoService {
  ruta=environment.service;
  constructor() { }
  ObtenerInscripcionantiguo(){
    return axios.get(this.ruta+'api/Inscripcionantiguo/');
  }
  AgregarInscripcionantiguo(Inscripcionantiguo){
    return axios.post(this.ruta+'api/Inscripcionantiguo/',Inscripcionantiguo);
  }
  ModificarInscripcionantiguo(Inscripcionantiguoform:FormData){
    return axios.post(this.ruta+'api/InscripcionantiguoUpdate/'+Inscripcionantiguoform.get('id_ins_ant'),Inscripcionantiguoform);
  }
  SeleccionarInscripcionantiguo(id){
    return axios.get(this.ruta+'api/Inscripcionantiguo/'+id);
  }
  EliminarInscripcionantiguo(id){
    return axios.delete(this.ruta+'api/Inscripcionantiguo/'+id);
  }


  ObtenerCarreraEst(id){
    return axios.get(this.ruta+'api/InscripcionantiguoGetCarrera/'+id);
  }
}
