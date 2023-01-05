import { Component, OnInit } from '@angular/core';
import { EvaluacionProgramaService } from 'src/app/core/services/ACADEMICO/postgrado/evaluacion-programa.service';
import { InscritosProgramaService } from 'src/app/core/services/ACADEMICO/postgrado/inscritos-programa.service';
import { ModuloDocFechaService } from 'src/app/core/services/ACADEMICO/postgrado/modulo-doc-fecha.service';
import { ProgramasService } from 'src/app/core/services/ACADEMICO/postgrado/programas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  ruta=environment.service
  constructor(protected _inscritos:InscritosProgramaService,
              protected _programa:ProgramasService,
              protected _modulo_doc_fechas:ModuloDocFechaService,
              protected _evaluacion_programas:EvaluacionProgramaService,
    ) {

  }

  ngOnInit(): void {
    this.CargarPrograma();
    // this.CargarModuloDocFechaAdmins();
    this.CargarModuloDocFechasEstudiantes(1)
  }
  //#region Datos de Perfil
  NombreCompleto='LUIS CRISTIAN CHOQUE CHOQUE'
  telefono='65434567'
  correo='caito@gmail.com'
  residencia='Tacna y Colón'
  institucion='Universidad Privada de Oruro UNIOR'
  tipo_usuario='estudiante'
  ci='56788'
  edad='22'


  //#endregion

programa=[]
public pageCarrera:Number;
CargarPrograma(){
  this._programa.ObtenerPrograma()
  .then(res => {
    console.log("Programa Cargado",res.data);
    this.programa = res.data;
  }).catch(error =>  {
  console.log('Error al Cargar Programa',error.response.data.message);
  });
}


modulos=[]
//PARA ADMINISTRADIRES
CargarModuloDocFechaAdmins(){ //CARGA DE MODULO O CURSOS
  this._modulo_doc_fechas.ObtenerModuloDocFecha()
  .then(res => {
    console.log("Programa ModuloDocFecha",res.data);
    this.modulos = res.data;
  }).catch(error =>  {
  console.log('Error al Cargar Programa',error.response.data.message);
  });
}


//PARA ESTUDIANTES
CargarModuloDocFechasEstudiantes(idEst:number){ //CARGA DE MODULO O CURSOS
  this._evaluacion_programas.ListarCursosdelEstudiante(idEst)
  .then(res => {
    console.log("Programa ModuloDocFecha",res.data);
    this.modulos = res.data;
  }).catch(error =>  {
  console.log('Error al Cargar Programa',error.response.data.message);
  });
}
// inscritos=[]
// // public pageCarrera:Number;
// CargarIns(){
//   this._modulo_doc_fechas.ObtenerI()
//   .then(res => {
//     console.log("Programa Cargado",res.data);
//     this._inscritos = res.data;
//   }).catch(error =>  {
//   console.log('Error al Cargar Programa',error.response.data.message);
//   });
// }
}





