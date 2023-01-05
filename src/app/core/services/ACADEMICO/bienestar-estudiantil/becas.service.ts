import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BecasService {
  ruta=environment.service;
  constructor() { }
  ObtenerBecas(){
    return axios.get(this.ruta+'api/Becas/');
  }
  AgregarBecas(Becas){
    return axios.post(this.ruta+'api/Becas/',Becas);
  }
  ModificarBecas(Becas, id){
    return axios.put(this.ruta+'api/Becas/'+id,Becas);
  }
  SeleccionarBecas(id){
    return axios.get(this.ruta+'api/Becas/'+id);
  }
  EliminarBecas(id){
    return axios.delete(this.ruta+'api/Becas/'+id);
  }
}