import { Injectable } from '@angular/core';
import  axios  from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitFodaService {

  ruta = environment.service;
  constructor() {}
  ObtenerSitFoda(){
    return axios.get(this.ruta+'api/SitFoda/');
  }

  AgregarSitFoda(SitFoda){
    return axios.post(this.ruta+'api/SitFoda/',SitFoda);
  }

  ModificarSitFoda(SitFoda,id){
    return axios.put(this.ruta +'api/SitFoda/'+id,SitFoda);
  }

  SeleccionarSitFoda(idSend){
    return axios.get(this.ruta+'api/SitFoda/'+idSend);
  }

  EliminarSitFoda(id){
    return axios.delete(this.ruta+'api/SitFoda/'+id);
  }
}
