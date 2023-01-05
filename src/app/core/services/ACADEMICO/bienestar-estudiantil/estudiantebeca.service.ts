import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantebecaService {
  ruta=environment.service;
  constructor() { }
  ObtenerEstudiantebecas(){
    return axios.get(this.ruta+'api/Estudiantebeca/');
  }
  AgregarEstudiantebeca(Estudiantebeca){
    return axios.post(this.ruta+'api/Estudiantebeca/',Estudiantebeca);
  }
  ModificarEstudiantebeca(Estudiantebeca,id){
    return axios.post(this.ruta+'api/EstudiantebecadoUpdate/'+id,Estudiantebeca);
  }
  SeleccionarEstudiantebeca(id){
    return axios.get(this.ruta+'api/Estudiantebeca/'+id);
  }
  EliminarEstudiantebeca(id){
    return axios.delete(this.ruta+'api/Estudiantebeca/'+id);
  }
}
