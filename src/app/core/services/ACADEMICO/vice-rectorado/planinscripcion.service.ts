import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaninscripcionService {
  ruta=environment.service;
  constructor() { }
  Obtenerplaninscripciones(){
    return axios.get(this.ruta+'api/Planinscripcion/');
  }
  Agregarplaninscripciones(planinscripcion){
    return axios.post(this.ruta+'api/Planinscripcion/',planinscripcion);
  }
  Modificarplaninscripciones(planinscripcion,id){
    return axios.post(this.ruta+'api/PlaninscripcionUpdate/'+id,planinscripcion);
  }
  Seleccionarplaninscripciones(id){
    return axios.get(this.ruta+'api/Planinscripcion/'+id);
  }
  Eliminarplaninscripciones(id){
    return axios.delete(this.ruta+'api/Planinscripcion/'+id);
  }
}
