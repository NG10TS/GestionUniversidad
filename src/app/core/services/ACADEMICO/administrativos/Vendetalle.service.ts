import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendetalleService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerVendetalle(){
    return axios.get(this.ruta+'api/Vendetalle/');
  }
  AgregarVendetalle(Vendetalle){
    return axios.post(this.ruta+'api/Vendetalle/',Vendetalle);
  }
  ModificarVendetalle(Vendetalle,id){
    return axios.post(this.ruta+'api/VendetalleUpdate/'+id,Vendetalle);
  }
  SeleccionarVendetalle(id){
    return axios.get(this.ruta+'api/Vendetalle/'+id);
  }
  EliminarVendetalle(id){
    return axios.delete(this.ruta+'api/Vendetalle/'+id);
  }

}
