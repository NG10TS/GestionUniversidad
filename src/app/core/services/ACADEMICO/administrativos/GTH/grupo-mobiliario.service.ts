import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoMobiliarioService {

  ruta=environment.service;
    constructor() { }
    ObtenerGrupoMobiliario(){
      return axios.get(this.ruta+'api/GrupoMobiliario/');
    }
    AgregarGrupoMobiliario(GrupoMobiliario){
      return axios.post(this.ruta+'api/GrupoMobiliario/',GrupoMobiliario);
    }
    ModificarGrupoMobiliario(GrupoMobiliario, id){
      return axios.put(this.ruta+'api/GrupoMobiliario/'+id,GrupoMobiliario);
    }
    SeleccionarGrupoMobiliario(id){
      return axios.get(this.ruta+'api/GrupoMobiliario/'+id);
    }
    EliminarGrupoMobiliario(id){
      return axios.delete(this.ruta+'api/GrupoMobiliario/'+id);
    }

}
