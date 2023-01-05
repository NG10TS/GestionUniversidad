import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrativosService {
  ruta=environment.service;
  constructor() { }
  ObtenerAdministrativos(){
    return axios.get(this.ruta+'api/Administrativo/');
  }
  AgregarAdministrativo(Administrativo){
    return axios.post(this.ruta+'api/Administrativo/',Administrativo);
  }
  ModificarAdministrativo(Administrativo,id){
    return axios.post(this.ruta+'api/AdministrativoUpdate/'+id,Administrativo);
  }
  SeleccionarAdministrativo(id){
    return axios.get(this.ruta+'api/Administrativo/'+id);
  }
  EliminarAdministrativo(id){
    return axios.delete(this.ruta+'api/Administrativo/'+id);
  }
}
