import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargosAdminService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerCargoAdmins(){
    return axios.get(this.ruta+'api/CargoAdmin/');
  }
  AgregarCargoAdmin(CargoAdmin){
    return axios.post(this.ruta+'api/CargoAdmin/',CargoAdmin);
  }
  ModificarCargoAdmin(CargoAdmin,id){
    return axios.post(this.ruta+'api/CargoAdminUpdate/'+id,CargoAdmin);
  }
  SeleccionarCargoAdmin(id){
    return axios.get(this.ruta+'api/CargoAdmin/'+id);
  }
  EliminarCargoAdmin(id){
    return axios.delete(this.ruta+'api/CargoAdmin/'+id);
  }

}
