import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevalidasService {
  ruta=environment.service;
  constructor() { }
  ObtenerRevalidass(){
    return axios.get(this.ruta+'api/Revalidas/');
  }
  AgregarRevalidas(Revalidas){
    return axios.post(this.ruta+'api/Revalidas/',Revalidas);
  }
  ModificarRevalidas(Revalidas, id){
    return axios.post(this.ruta+'api/RevalidasUpdate/'+id,Revalidas);
  }
  SeleccionarRevalidas(id){
    return axios.get(this.ruta+'api/Revalidas/'+id);
  }
  EliminarRevalidas(id){
    return axios.delete(this.ruta+'api/Revalidas/'+id);
  }

}
