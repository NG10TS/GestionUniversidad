import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor() { }
  ruta=environment.service;
    ObtenerPrograma(){
      return axios.get(this.ruta+'api/Programa/');
    }
    AgregarPrograma(Programa){
      return axios.post(this.ruta+'api/Programa/',Programa);
    }
    ModificarPrograma(Programa, id){
      return axios.put(this.ruta+'api/Programa/'+id,Programa);
    }
    SeleccionarPrograma(id){
      return axios.get(this.ruta+'api/Programa/'+id);
    }
    EliminarPrograma(id){
      return axios.delete(this.ruta+'api/Programa/'+id);
    }
    FiltrarProgramasActivos(data){
      data.forEach(e => {
        e.habilitadoActivo=e.habilitado+'' //"true"
      });
      return data.filter(a => (a.habilitadoActivo.indexOf('true')) > -1 || (a.habilitadoActivo.indexOf('1')) > -1)
    }

}
