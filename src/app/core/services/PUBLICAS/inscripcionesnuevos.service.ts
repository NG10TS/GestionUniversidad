import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesnuevosService {
  ruta=environment.service;
  constructor() { }
  ObtenerInscripcionesnuevos(){
    return axios.get(this.ruta+'api/Inscripcionesnuevos/');
  }
  AgregarInscripcionesnuevos(Inscripcionesnuevos){
    return axios.post(this.ruta+'api/Inscripcionesnuevos/',Inscripcionesnuevos);
  }
  ModificarInscripcionesnuevos(Inscripcionesnuevosform:FormData){
    return axios.post(this.ruta+'api/InscripcionesnuevosUpdate/'+Inscripcionesnuevosform.get('id_ins_ant'),Inscripcionesnuevosform);
  }
  SeleccionarInscripcionesnuevos(id){
    return axios.get(this.ruta+'api/Inscripcionesnuevos/'+id);
  }
  EliminarInscripcionesnuevos(id){
    return axios.delete(this.ruta+'api/Inscripcionesnuevos/'+id);
  }
  ObtenerCarreraEst(id){
    return axios.get(this.ruta+'api/InscripcionesnuevosGetCarrera/'+id);
  }
}
