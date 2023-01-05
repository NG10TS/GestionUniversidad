import { Injectable } from '@angular/core';
import  axios  from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoSitService {

  ruta = environment.service;
  constructor() {}
  ObtenerTipoSit(){
    return axios.get(this.ruta+'api/TipoSit/');
  }

  AgregarTipoSit(TipoSit){
    return axios.post(this.ruta+'api/TipoSit/',TipoSit);
  }

  ModificarTipoSit(TipoSit,id){
    return axios.put(this.ruta +'api/TipoSit/'+id,TipoSit);
  }

  SeleccionarTipoSit(idSend){
    return axios.get(this.ruta+'api/TipoSit/'+idSend);
  }

  EliminarTipoSit(id){
    return axios.delete(this.ruta+'api/TipoSit/'+id);
  }
}
