import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VensemestreService {
  ruta=environment.service;
  constructor() { }
  //PARA CARGOS
  ObtenerVensemestre(){
    return axios.get(this.ruta+'api/Vensemestre/');
  }
  AgregarVensemestre(Vensemestre){
    return axios.post(this.ruta+'api/Vensemestre/',Vensemestre);
  }
  ModificarVensemestre(Vensemestre,id){
    return axios.post(this.ruta+'api/VensemestreUpdate/'+id,Vensemestre);
  }
  SeleccionarVensemestre(id){
    return axios.get(this.ruta+'api/Vensemestre/'+id);
  }
  EliminarVensemestre(id){
    return axios.delete(this.ruta+'api/Vensemestre/'+id);
  }

}
