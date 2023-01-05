import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoObligacionesEstsService {

  ruta=environment.service;
    constructor() { }
    ObtenerTipoObligacionesEsts(){
      return axios.get(this.ruta+'api/TipoObligacionesEst/');
    }
    AgregarTipoObligacionesEst(TipoObligacionesEst){
      return axios.post(this.ruta+'api/TipoObligacionesEst/',TipoObligacionesEst);
    }
    ModificarTipoObligacionesEst(TipoObligacionesEst, id){
      return axios.put(this.ruta+'api/TipoObligacionesEst/'+id,TipoObligacionesEst);
    }
    SeleccionarTipoObligacionesEst(id){
      return axios.get(this.ruta+'api/TipoObligacionesEst/'+id);
    }
    EliminarTipoObligacionesEst(id){
      return axios.delete(this.ruta+'api/TipoObligacionesEst/'+id);
    }
}
