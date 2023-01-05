import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionPagosService {

  ruta=environment.service;
    constructor() { }
    ObtenerGestionPagos(){
      return axios.get(this.ruta+'api/GestionPago/');
    }
    AgregarGestionPago(GestionPago){
      return axios.post(this.ruta+'api/GestionPago/',GestionPago);
    }
    ModificarGestionPago(GestionPago, id){
      return axios.put(this.ruta+'api/GestionPago/'+id,GestionPago);
    }
    SeleccionarGestionPago(id){
      return axios.get(this.ruta+'api/GestionPago/'+id);
    }
    EliminarGestionPago(id){
      return axios.delete(this.ruta+'api/GestionPago/'+id);
    }
}
