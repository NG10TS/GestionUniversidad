import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoAdminService {

  ruta=environment.service;
    constructor() { }
    ObtenerTipoAdmins(){
      return axios.get(this.ruta+'api/TipoAdmin/');
    }
    AgregarTipoAdmin(TipoAdmin){
      return axios.post(this.ruta+'api/TipoAdmin/',TipoAdmin);
    }
    ModificarTipoAdmin(TipoAdmin, id){
      return axios.put(this.ruta+'api/TipoAdmin/'+id,TipoAdmin);
    }
    SeleccionarTipoAdmin(id){
      return axios.get(this.ruta+'api/TipoAdmin/'+id);
    }
    EliminarTipoAdmin(id){
      return axios.delete(this.ruta+'api/TipoAdmin/'+id);
    }
}
