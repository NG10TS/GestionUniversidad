import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionProgramaService {

  ruta=environment.service;
    constructor() { }
    ObtenerEvaluacionProgramas(){
      return axios.get(this.ruta+'api/EvaluacionPrograma/');
    }
    AgregarEvaluacionPrograma(EvaluacionPrograma){
      return axios.post(this.ruta+'api/EvaluacionPrograma/',EvaluacionPrograma);
    }
    ModificarEvaluacionPrograma(EvaluacionPrograma, id){
      return axios.put(this.ruta+'api/EvaluacionPrograma/'+id,EvaluacionPrograma);
    }
    SeleccionarEvaluacionPrograma(id){
      return axios.get(this.ruta+'api/EvaluacionPrograma/'+id);
    }
    EliminarEvaluacionPrograma(id){
      return axios.delete(this.ruta+'api/EvaluacionPrograma/'+id);
    }
    ObtenerListaInscritosModulo(idCModulo:number){
      let data={
        idModulo:idCModulo
      }
      // console.log("cargacion",EvaluacionPrograma);
      return axios.post(this.ruta+'api/getEstudiantesModulo',data)
    }

    ListarCursosdelEstudiante(idEst:number)
    {
      let data={
        idEst:idEst
      }
      // console.log("cargacion",EvaluacionPrograma);
      return axios.post(this.ruta+'api/ListarModulodeEstudiante',data)
    }

    addEvaluacionPrograma(data){ //NORMALMENTE USADO PARA AÑADIR LOS MODULOS A UN ESTUDIANTE
      return axios.post(this.ruta+'api/addEvaluacionPrograma/',data);
    }

    GuardarCambiosRegistro(data){
      return axios.post(this.ruta+'api/GuardarCambiosRegistroEvaluacionPrograma/',data);
    }
}
