import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioPresuService {

  ruta = environment.service;
  constructor() {}
  ObtenerFormularioPresu(){
    return axios.get(this.ruta+'api/FormularioPresu/');
  }

  AgregarFormularioPresu(FormularioPresu){
    return axios.post(this.ruta+'api/FormularioPresu/',FormularioPresu);
  }

  ModificarFormularioPresu(FormularioPresu,id){
    return axios.put(this.ruta +'api/FormularioPresu/'+id,FormularioPresu);
  }

  SeleccionarFormularioPresu(id){
    return axios.get(this.ruta+'api/FormularioPresu/'+id);
  }

  EliminarFormularioPresu(id){
    return axios.delete(this.ruta+'api/FormularioPresu/'+id);
  }
}
