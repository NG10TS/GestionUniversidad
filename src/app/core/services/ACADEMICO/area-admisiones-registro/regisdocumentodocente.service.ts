import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisdocumentodocenteService {
  ruta=environment.service;
  constructor() { }
  Obtenerregisdocumentodocentes(){
    return axios.get(this.ruta+'api/regisdocumentodocente/');
  }
  Agregarregisdocumentodocente(regisdocumentodocente){
    return axios.post(this.ruta+'api/regisdocumentodocente/',regisdocumentodocente);
  }
  Modificarregisdocumentodocente(regisdocumentodocente, id){
    return axios.post(this.ruta+'api/regisdocumentodocenteUpdate/'+id,regisdocumentodocente);
  }
  Seleccionarregisdocumentodocente(id){
    return axios.get(this.ruta+'api/regisdocumentodocente/'+id);
  }
  Eliminarregisdocumentodocente(id){
    return axios.delete(this.ruta+'api/regisdocumentodocente/'+id);
  }

}
