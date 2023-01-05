import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalariosAdminService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerSalarioAdmins(){
    return axios.get(this.ruta+'api/SalarioAdmin/');
  }
  AgregarSalarioAdmin(SalarioAdmin){
    return axios.post(this.ruta+'api/SalarioAdmin/',SalarioAdmin);
  }
  ModificarSalarioAdmin(SalarioAdmin,id){
    return axios.post(this.ruta+'api/SalarioAdminUpdate/'+id,SalarioAdmin);
  }
  SeleccionarSalarioAdmin(id){
    return axios.get(this.ruta+'api/SalarioAdmin/'+id);
  }
  EliminarSalarioAdmin(id){
    return axios.delete(this.ruta+'api/SalarioAdmin/'+id);
  }

}
