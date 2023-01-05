import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  ruta=environment.service;
    constructor() { }
    ObtenerEmpresa(){
      return axios.get(this.ruta+'api/Empresa/');
    }
    AgregarEmpresa(Empresa){
      return axios.post(this.ruta+'api/Empresa/',Empresa);
    }
    // AgregarEmpresa(Empresa){
    //   return axios({
    //     method:'post',
    //     url:this.ruta+'api/Empresa',
    //     data:Empresa,
    //     headers:{'Content-Type':'multipart/form-data'}
    //   })
    // }
    ModificarEmpresa(Empresa, id){
      return axios.post(this.ruta+'api/EmpresaUpdate/'+id,Empresa);
    }
    SeleccionarEmpresa(id){
      return axios.get(this.ruta+'api/Empresa/'+id);
    }
    EliminarEmpresa(id){
      return axios.delete(this.ruta+'api/Empresa/'+id);
    }
}
