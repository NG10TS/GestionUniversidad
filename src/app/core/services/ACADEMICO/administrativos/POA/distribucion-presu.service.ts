import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistribucionPresuService {

  ruta = environment.service;
  constructor() {}
  ObtenerDistribucionPresu(){
    return axios.get(this.ruta+'api/DistribucionPresu/');
  }

  AgregarDistribucionPresu(DistribucionPresu){
    return axios.post(this.ruta+'api/DistribucionPresu/',DistribucionPresu);
  }

  ModificarDistribucionPresu(DistribucionPresu,id){
    return axios.put(this.ruta +'api/DistribucionPresu/'+id,DistribucionPresu);
  }

  SeleccionarDistribucionPresu(id){
    return axios.get(this.ruta+'api/DistribucionPresu/'+id);
  }

  EliminarDistribucionPresu(id){
    return axios.delete(this.ruta+'api/DistribucionPresu/'+id);
  }
}
