import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VincularContenidosService {
    ruta=environment.service;
    constructor() { }
    ObtenerVincularContenidos(){
        return axios.get(this.ruta+'api/VincularContenidos/');
    }
    AgregarVincularContenidos(VincularContenidos){
        return axios.post(this.ruta+'api/VincularContenidos/',VincularContenidos);
    }
    ModificarVincularContenidos(VincularContenidos, id){
        return axios.put(this.ruta+'api/VincularContenidos/'+id,VincularContenidos);
    }
    SeleccionarVincularContenidos(id){
        return axios.get(this.ruta+'api/VincularContenidos/'+id);
    }
    EliminarVincularContenidos(id){
        return axios.delete(this.ruta+'api/VincularContenidos/'+id);
    }
}
