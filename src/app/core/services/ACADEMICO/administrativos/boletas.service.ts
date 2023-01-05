import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletasService {
   ruta=environment.service;
     constructor() { }
     ObtenerBoletas(){
       return axios.get(this.ruta+'api/Boleta/');
     }
     AgregarBoleta(Boleta){
       return axios.post(this.ruta+'api/Boleta/',Boleta);
     }
     ModificarBoleta(Boleta, id){
       return axios.put(this.ruta+'api/Boleta/'+id,Boleta);
     }
     SeleccionarBoleta(id){
       return axios.get(this.ruta+'api/Boleta/'+id);
     }
     EliminarBoleta(id){
       return axios.delete(this.ruta+'api/Boleta/'+id);
     }
}
