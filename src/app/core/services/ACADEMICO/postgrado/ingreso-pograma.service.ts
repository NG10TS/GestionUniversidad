import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoPogramaService {
ruta=environment.service;
    constructor() { }
    ObtenerIngresoProgramas(){
      return axios.get(this.ruta+'api/IngresoPrograma/');
    }
    AgregarIngresoPrograma( IngresoPrograma){
      return axios.post(this.ruta+'api/IngresoPrograma/', IngresoPrograma);
    }
    ModificarIngresoPrograma( IngresoPrograma, id){
      return axios.post(this.ruta+'api/updateIngresoPrograma/'+id, IngresoPrograma);
    }
    SeleccionarIngresoPrograma(id){
      return axios.get(this.ruta+'api/IngresoPrograma/'+id);
    }
    EliminarIngresoPrograma(id){
      return axios.delete(this.ruta+'api/IngresoPrograma/'+id);
    }
}
