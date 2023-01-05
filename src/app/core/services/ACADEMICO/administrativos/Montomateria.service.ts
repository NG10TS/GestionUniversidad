import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MontomateriaService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerMontomateria(){
    return axios.get(this.ruta+'api/Montomateria/');
  }
  AgregarMontomateria(Montomateria){
    return axios.post(this.ruta+'api/Montomateria/',Montomateria);
  }
  ModificarMontomateria(Montomateria,id){
    return axios.post(this.ruta+'api/MontomateriaUpdate/'+id,Montomateria);
  }
  SeleccionarMontomateria(id){
    return axios.get(this.ruta+'api/Montomateria/'+id);
  }
  EliminarMontomateria(id){
    return axios.delete(this.ruta+'api/Montomateria/'+id);
  }

}
