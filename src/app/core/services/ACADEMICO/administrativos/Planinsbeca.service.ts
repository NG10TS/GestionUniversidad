
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaninsbecaService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerPlaninsbeca(){
    return axios.get(this.ruta+'api/Planinsbeca/');
  }
  AgregarPlaninsbeca(Planinsbeca){
    return axios.post(this.ruta+'api/Planinsbeca/',Planinsbeca);
  }
  ModificarPlaninsbeca(Planinsbeca,id){
    return axios.post(this.ruta+'api/PlaninsbecaUpdate/'+id,Planinsbeca);
  }
  SeleccionarPlaninsbeca(id){
    return axios.get(this.ruta+'api/Planinsbeca/'+id);
  }
  EliminarPlaninsbeca(id){
    return axios.delete(this.ruta+'api/Planinsbeca/'+id);
  }

}
