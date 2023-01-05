import { Injectable } from '@angular/core';
import  axios  from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisisFodaService {

  ruta = environment.service;
  constructor() {}
  ObtenerAnalisisFoda(){
    return axios.get(this.ruta+'api/AnalisisFoda/');
  }

  AgregarAnalisisFoda(AnalisisFoda){
    return axios.post(this.ruta+'api/AnalisisFoda/',AnalisisFoda);
  }

  ModificarAnalisisFoda(AnalisisFoda,id){
    return axios.put(this.ruta +'api/AnalisisFoda/'+id,AnalisisFoda);
  }

  SeleccionarAnalisisFoda(idSend){
    return axios.get(this.ruta+'api/AnalisisFoda/'+idSend);
  }

  EliminarAnalisisFoda(id){
    return axios.delete(this.ruta+'api/AnalisisFoda/'+id);
  }
}
