import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvUnivCarsService {

  ruta=environment.service;
    constructor() { }
    ObtenerConvUnivCars(){
      return axios.get(this.ruta+'api/ConvUnivCar/');
    }
    AgregarConvUnivCar(ConvUnivCar){
      return axios.post(this.ruta+'api/ConvUnivCar/',ConvUnivCar);
    }
    ModificarConvUnivCar(ConvUnivCar, id){
      return axios.put(this.ruta+'api/ConvUnivCar/'+id,ConvUnivCar);
    }
    SeleccionarConvUnivCar(id){
      return axios.get(this.ruta+'api/ConvUnivCar/'+id);
    }
    EliminarConvUnivCar(id){
      return axios.delete(this.ruta+'api/ConvUnivCar/'+id);
    }

    ObtenerCarrerasUniversidad(id){
      return axios.get(this.ruta+'api/ConvUnivCarCarreraUniversidad/'+id);
    }
}
