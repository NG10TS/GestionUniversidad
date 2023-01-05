import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroCajaChicaService {
    ruta=environment.service;
      constructor() { }
      ObtenerRegistroCajaChicas(){
        return axios.get(this.ruta+'api/RegistroCajaChica/');
      }
      AgregarRegistroCajaChica(RegistroCajaChica){
        return axios.post(this.ruta+'api/RegistroCajaChica/',RegistroCajaChica);
      }
      ModificarRegistroCajaChica(RegistroCajaChica, id){
        return axios.put(this.ruta+'api/RegistroCajaChica/'+id,RegistroCajaChica);
      }
      SeleccionarRegistroCajaChica(id){
        return axios.get(this.ruta+'api/RegistroCajaChica/'+id);
      }
      EliminarRegistroCajaChica(id){
        return axios.delete(this.ruta+'api/RegistroCajaChica/'+id);
      }
}
