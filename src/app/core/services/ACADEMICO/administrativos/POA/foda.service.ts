import { Injectable } from '@angular/core';
import  axios  from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FodaService {

  ruta = environment.service;
  constructor() {}
  ObtenerFoda(){
    return axios.get(this.ruta+'api/Foda/');
  }

  AgregarFoda(Foda){
    return axios.post(this.ruta+'api/Foda/',Foda);
  }

  ModificarFoda(Foda,id){
    return axios.put(this.ruta +'api/Foda/'+id,Foda);
  }

  SeleccionarFoda(idSend){
    return axios.get(this.ruta+'api/Foda/'+idSend);
  }

  EliminarFoda(id){
    return axios.delete(this.ruta+'api/Foda/'+id);
  }
}
