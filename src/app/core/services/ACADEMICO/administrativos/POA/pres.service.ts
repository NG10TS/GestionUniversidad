import { Injectable } from '@angular/core';
import  axios  from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresService {

  ruta = environment.service;
  constructor() {}
  ObtenerPres(){
    return axios.get(this.ruta+'api/Pres/');
  }

  AgregarPres(Pres){
    return axios.post(this.ruta+'api/Pres/',Pres);
  }

  ModificarPres(Pres,id){
    return axios.put(this.ruta +'api/Pres/'+id,Pres);
  }

  SeleccionarPres(idSend){
    return axios.get(this.ruta+'api/Pres/'+idSend);
  }

  EliminarPres(id){
    return axios.delete(this.ruta+'api/Pres/'+id);
  }
}
