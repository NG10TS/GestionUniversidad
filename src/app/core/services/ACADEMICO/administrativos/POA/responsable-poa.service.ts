import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsablePoaService {
  
  ruta=environment.service;
    constructor() { }
    ObtenerResponsablePoas(){
      return axios.get(this.ruta+'api/ResponsablePoa/');
    }
    AgregarResponsablePoa(ResponsablePoa){
      return axios.post(this.ruta+'api/ResponsablePoa/',ResponsablePoa);
    }
    ModificarResponsablePoa(ResponsablePoa, id){
      return axios.put(this.ruta+'api/ResponsablePoa/'+id,ResponsablePoa);
    }
    SeleccionarResponsablePoa(id){
      return axios.get(this.ruta+'api/ResponsablePoa/'+id);
    }
    EliminarResponsablePoa(id){
      return axios.delete(this.ruta+'api/ResponsablePoa/'+id);
    }
}
