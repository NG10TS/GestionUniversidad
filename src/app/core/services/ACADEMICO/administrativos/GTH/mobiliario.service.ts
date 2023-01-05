import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MobiliarioService {

  ruta=environment.service;
    constructor() { }
    ObtenerMobiliario(){
      return axios.get(this.ruta+'api/Mobiliario/');
    }
    AgregarMobiliario(Mobiliario){
      return axios.post(this.ruta+'api/Mobiliario/',Mobiliario);
    }
    ModificarMobiliario(Mobiliario, id){
      return axios.put(this.ruta+'api/Mobiliario/'+id,Mobiliario);
    }
    SeleccionarMobiliario(id){
      return axios.get(this.ruta+'api/Mobiliario/'+id);
    }
    EliminarMobiliario(id){
      return axios.delete(this.ruta+'api/Mobiliario/'+id);
    }
}
