import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CajaChicaService {

  ruta=environment.service;
    constructor() { }
    ObtenerCajaChicas(){
      return axios.get(this.ruta+'api/CajaChica/');
    }
    AgregarCajaChica(CajaChica){
      return axios.post(this.ruta+'api/CajaChica/',CajaChica);
    }
    ModificarCajaChica(CajaChica, id){
      return axios.put(this.ruta+'api/CajaChica/'+id,CajaChica);
    }
    SeleccionarCajaChica(id){
      return axios.get(this.ruta+'api/CajaChica/'+id);
    }
    EliminarCajaChica(id){
      return axios.delete(this.ruta+'api/CajaChica/'+id);
    }
}
