import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  ruta=environment.service;
  constructor() { }
  ObtenerMaterias(){
    return axios.get(this.ruta+'api/Materia/');
  }
  AgregarMateria(Materia){
    return axios.post(this.ruta+'api/Materia/',Materia);
  }
  ModificarMateria(Materia, id){
    return axios.post(this.ruta+'api/MateriaUpdate/'+id,Materia);
  }
  SeleccionarMateria(id){
    return axios.get(this.ruta+'api/Materia/'+id);
  }
  EliminarMateria(id){
    return axios.delete(this.ruta+'api/Materia/'+id);
  }
}
