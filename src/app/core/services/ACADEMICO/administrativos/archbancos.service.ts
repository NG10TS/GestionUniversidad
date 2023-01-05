import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchbancosService {

  ruta=environment.service;
    constructor() { }
    ObtenerArchBancos(){
      return axios.get(this.ruta+'api/ArchBanco/');
    }
    AgregarArchBanco(ArchBanco){
      return axios.post(this.ruta+'api/ArchBanco/',ArchBanco);
    }
    ModificarArchBanco(ArchBanco, id){
      return axios.put(this.ruta+'api/ArchBanco/'+id,ArchBanco);
    }
    SeleccionarArchBanco(id){
      return axios.get(this.ruta+'api/ArchBanco/'+id);
    }
    EliminarArchBanco(id){
      return axios.delete(this.ruta+'api/ArchBanco/'+id);
    }

}
