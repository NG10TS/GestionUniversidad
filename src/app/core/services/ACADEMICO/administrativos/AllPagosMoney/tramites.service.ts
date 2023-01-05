import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  ruta=environment.service;
    constructor() { }
    ObtenerTramites(){
      return axios.get(this.ruta+'api/Tramite/');
    }
    AgregarTramite(Tramite){
      return axios.post(this.ruta+'api/Tramite/',Tramite);
    }
    ModificarTramite(Tramite, id){
      return axios.put(this.ruta+'api/Tramite/'+id,Tramite);
    }
    SeleccionarTramite(id){
      return axios.get(this.ruta+'api/Tramite/'+id);
    }
    EliminarTramite(id){
      return axios.delete(this.ruta+'api/Tramite/'+id);
    }
}
