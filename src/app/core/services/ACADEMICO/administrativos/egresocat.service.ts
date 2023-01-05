import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresocatService {

   ruta=environment.service;
     constructor() { }
     ObtenerEgresoCategorias(){
       return axios.get(this.ruta+'api/EgresoCategoria/');
     }
     AgregarEgresoCategoria(EgresoCategoria){
       return axios.post(this.ruta+'api/EgresoCategoria/',EgresoCategoria);
     }
     ModificarEgresoCategoria(EgresoCategoria, id){
       return axios.put(this.ruta+'api/EgresoCategoria/'+id,EgresoCategoria);
     }
     SeleccionarEgresoCategoria(id){
       return axios.get(this.ruta+'api/EgresoCategoria/'+id);
     }
     EliminarEgresoCategoria(id){
       return axios.delete(this.ruta+'api/EgresoCategoria/'+id);
     }
}
