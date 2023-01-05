import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumenplanillaService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerResumenplanilla(){
    return axios.get(this.ruta+'api/Resumenplanilla/');
  }
  AgregarResumenplanilla(Resumenplanilla){
    return axios.post(this.ruta+'api/Resumenplanilla/',Resumenplanilla);
  }
  ModificarResumenplanilla(Resumenplanilla,id){
    return axios.post(this.ruta+'api/ResumenplanillaUpdate/'+id,Resumenplanilla);
  }
  SeleccionarResumenplanilla(id){
    return axios.get(this.ruta+'api/Resumenplanilla/'+id);
  }
  EliminarResumenplanilla(id){
    return axios.delete(this.ruta+'api/Resumenplanilla/'+id);
  }

}
