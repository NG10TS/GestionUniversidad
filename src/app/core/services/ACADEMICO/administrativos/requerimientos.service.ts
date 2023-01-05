import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequerimientosService {

   ruta=environment.service;
     constructor() { }
     ObtenerRequerimientos(){
       return axios.get(this.ruta+'api/Requerimiento/');
     }
     AgregarRequerimiento(Requerimiento){
       return axios.post(this.ruta+'api/Requerimiento/',Requerimiento);
     }
     ModificarRequerimiento(Requerimiento, id){
       return axios.put(this.ruta+'api/Requerimiento/'+id,Requerimiento);
     }
     SeleccionarRequerimiento(id){
       return axios.get(this.ruta+'api/Requerimiento/'+id);
     }
     EliminarRequerimiento(id){
       return axios.delete(this.ruta+'api/Requerimiento/'+id);
     }
}
