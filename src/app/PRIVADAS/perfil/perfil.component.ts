import { EvaluacionesService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/evaluaciones.service';
import { ModuloDocFechaService } from './../../core/services/ACADEMICO/postgrado/modulo-doc-fecha.service';
import { ProgramasService } from './../../core/services/ACADEMICO/postgrado/programas.service';
import { InscritosProgramaService } from './../../core/services/ACADEMICO/postgrado/inscritos-programa.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EvaluacionProgramaService } from 'src/app/core/services/ACADEMICO/postgrado/evaluacion-programa.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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
  codigoInscripcion='123123'
  NombreCompleto='LUIS CRISTIAN CHOQUE CHOQUE'
  telefono='65434567'
  celular='65434567'
  correo='caito@gmail.com'
  domicilio='Tacna y Colón'
  NombreInstitucionTrabaja='Universidad Privada de Oruro UNIOR'
  DireccionTrabajo='dirasd'
  TelefonoTrabajo='123123'
  tipo_usuario='estudiante'
  ci='56788'
  fechNac='2000/05/31'
  edad='22'
  GradoAcademico='TECNICO SUPERIOR'

  Profesion='NO'




  newInscritosPrograma =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ins_programa:new FormControl(0),
    cod_ins_programa:new FormControl(this.codigoInscripcion),
    NombreCompleto: new FormControl(this.NombreCompleto),
    ci_ins:new FormControl(this.ci),

    fech_nac_ins:new FormControl(this.fechNac),
    dir_dom_ins:new FormControl(this.domicilio),
    institucion_trab_ins:new FormControl(this.NombreInstitucionTrabaja),
    dir_trab_ins:new FormControl(this.DireccionTrabajo),
    telf_trab_ins:new FormControl(this.TelefonoTrabajo),
    grado_acad_ins:new FormControl(this.GradoAcademico),

    profesion:new FormControl(this.Profesion),
    telf_domicilio:new FormControl(this.telefono),
    telf_movil:new FormControl(this.celular),
    correo:new FormControl(this.correo),
  })
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





