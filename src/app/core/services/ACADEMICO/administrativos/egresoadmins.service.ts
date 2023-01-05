import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresoadminsService {
  ruta=environment.service;
    constructor() { }
    ObtenerEgresoAdmins(){
      return axios.get(this.ruta+'api/EgresoAdmin/');
    }
    AgregarEgresoAdmin(EgresoAdmin){
      return axios.post(this.ruta+'api/EgresoAdmin/',EgresoAdmin);
    }
    ModificarEgresoAdmin(EgresoAdmin, id){
      return axios.put(this.ruta+'api/EgresoAdmin/'+id,EgresoAdmin);
    }
    SeleccionarEgresoAdmin(id){
      return axios.get(this.ruta+'api/EgresoAdmin/'+id);
    }
    EliminarEgresoAdmin(id){
      return axios.delete(this.ruta+'api/EgresoAdmin/'+id);
    }
}
