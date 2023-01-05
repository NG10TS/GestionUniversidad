import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  ruta=environment.service;
  constructor() { }
  ObtenerPersonas(){
    return axios.get(this.ruta+'api/Persona/');
  }
  AgregarPersona(Persona){
    return axios.post(this.ruta+'api/Persona/',Persona);
  }
  ModificarPersona(Persona, id){
    return axios.post(this.ruta+'api/PersonaUpdate/'+id,Persona);
  }
  SeleccionarPersona(id){
    return axios.get(this.ruta+'api/Persona/'+id);
  }
  EliminarPersona(id){
    return axios.delete(this.ruta+'api/Persona/'+id);
  }

}
