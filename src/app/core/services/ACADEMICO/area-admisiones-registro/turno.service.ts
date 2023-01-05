import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  ruta=environment.service;
    constructor() { }
    ObtenerTurnos(){
      return axios.get(this.ruta+'api/Turno/');
    }
    AgregarTurno(Turno){
      return axios.post(this.ruta+'api/Turno/',Turno);
    }
    ModificarTurno(Turno, id){
      return axios.put(this.ruta+'api/Turno/'+id,Turno);
    }
    SeleccionarTurno(id){
      return axios.get(this.ruta+'api/Turno/'+id);
    }
    EliminarTurno(id){
      return axios.delete(this.ruta+'api/Turno/'+id);
    }
}
