import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PapeletasService {

    ruta=environment.service;
      constructor() { }
      ObtenerPapeletas(){
        return axios.get(this.ruta+'api/Papeleta/');
      }
      AgregarPapeleta(Papeleta){
        return axios.post(this.ruta+'api/Papeleta/',Papeleta);
      }
      ModificarPapeleta(Papeleta, id){
        return axios.put(this.ruta+'api/Papeleta/'+id,Papeleta);
      }
      SeleccionarPapeleta(id){
        return axios.get(this.ruta+'api/Papeleta/'+id);
      }
      EliminarPapeleta(id){
        return axios.delete(this.ruta+'api/Papeleta/'+id);
      }
}
