import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesRegularesService {

  ruta=environment.service;
    constructor() { }
    ObtenerEstudianteRegulars(){
      return axios.get(this.ruta+'api/EstudianteRegular/');
    }
    AgregarEstudianteRegular(EstudianteRegular){
      return axios.post(this.ruta+'api/EstudianteRegular/',EstudianteRegular);
    }
    ModificarEstudianteRegular(EstudianteRegular, id){
      return axios.put(this.ruta+'api/EstudianteRegular/'+id,EstudianteRegular);
    }
    SeleccionarEstudianteRegular(id){
      return axios.get(this.ruta+'api/EstudianteRegular/'+id);
    }
    EliminarEstudianteRegular(id){
      return axios.delete(this.ruta+'api/EstudianteRegular/'+id);
    }
}
