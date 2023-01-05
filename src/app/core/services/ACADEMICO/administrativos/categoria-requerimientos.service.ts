import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRequerimientosService {
   ruta=environment.service;
     constructor() { }
     ObtenerCategoriaRequerimientoss(){
       return axios.get(this.ruta+'api/CategoriaRequerimientos/');
     }
     AgregarCategoriaRequerimientos(CategoriaRequerimientos){
       return axios.post(this.ruta+'api/CategoriaRequerimientos/',CategoriaRequerimientos);
     }
     ModificarCategoriaRequerimientos(CategoriaRequerimientos, id){
       return axios.put(this.ruta+'api/CategoriaRequerimientos/'+id,CategoriaRequerimientos);
     }
     SeleccionarCategoriaRequerimientos(id){
       return axios.get(this.ruta+'api/CategoriaRequerimientos/'+id);
     }
     EliminarCategoriaRequerimientos(id){
       return axios.delete(this.ruta+'api/CategoriaRequerimientos/'+id);
     }
}
