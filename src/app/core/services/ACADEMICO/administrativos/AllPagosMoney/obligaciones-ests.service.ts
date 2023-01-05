import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesEstsService {

  ruta=environment.service;
    constructor() { }
    ObtenerObligacionesEsts(){
      return axios.get(this.ruta+'api/ObligacionesEst/');
    }
    AgregarObligacionesEst(ObligacionesEst){
      return axios.post(this.ruta+'api/ObligacionesEst/',ObligacionesEst);
    }
    ModificarObligacionesEst(ObligacionesEst, id){
      return axios.put(this.ruta+'api/ObligacionesEst/'+id,ObligacionesEst);
    }
    SeleccionarObligacionesEst(id){
      return axios.get(this.ruta+'api/ObligacionesEst/'+id);
    }
    EliminarObligacionesEst(id){
      return axios.delete(this.ruta+'api/ObligacionesEst/'+id);
    }
}
