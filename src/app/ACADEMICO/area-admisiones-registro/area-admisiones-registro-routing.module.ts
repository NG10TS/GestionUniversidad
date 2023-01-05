import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativosComponent } from './components/administrativos/administrativos.component';
import { AsignacionEstudiantesComponent } from './components/asignacion-estudiantes/asignacion-estudiantes.component';
import { BoletinComponent } from './components/boletin/boletin.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { EgresadosComponent } from './components/egresados/egresados.component';
import { EgresadotitulosComponent } from './components/egresadotitulos/egresadotitulos.component';
import { EstadomateriaComponent } from './components/estadomateria/estadomateria.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { FacultadesComponent } from './components/facultades/facultades.component';
import { FileEstudianteComponent } from './components/file-estudiante/file-estudiante.component';
import { materiasComponent } from './components/materias/materias.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PrerrequisitoComponent } from './components/prerrequisito/prerrequisito.component';
import { RegisdocumentoComponent } from './components/regisdocumento/regisdocumento.component';
import { regisdocumentodocenteComponent } from './components/regisdocumentodocente/regisdocumentodocente.component';
import { RegistroDocumentoDetalleComponent } from './components/registro-documento-detalle/registro-documento-detalle.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { RevalidasComponent } from './components/revalidas/revalidas.component';
import { SemestreComponent } from './components/semestre/semestre.component';
import { UniversidadesComponent } from './components/universidades/universidades.component';
import { NotasEvaluasComponent } from './components/notas-evaluas/notas-evaluas.component';


const routes: Routes = [


  //PARA EL PLAN DE ESTUDIOS
  {path: 'carrera', component:CarrerasComponent},
  {path: 'semestre', component:SemestreComponent},
  {path: 'materias', component:materiasComponent},
  //plan-e ; pero esta en secre vice rectorado


  {path: 'Egresados', component:EgresadosComponent},
  {path: 'Egresadotitulos', component:EgresadotitulosComponent},
  {path: 'Revalidas', component:RevalidasComponent},
  {path: 'regisdocumentodocente', component:regisdocumentodocenteComponent},
  {path: 'estadomateria', component:EstadomateriaComponent},
  {path: 'regisdocumento', component:RegisdocumentoComponent},
  {path: 'estudiantes', component:EstudiantesComponent},
  {path: 'docentes', component:DocentesComponent},
  {path: 'prerrequisito', component:PrerrequisitoComponent},

  {path: 'AsignacionEstudiantes', component:AsignacionEstudiantesComponent},
  {path: 'administrativos', component:AdministrativosComponent},


  {path: 'boletin', component:BoletinComponent},
  {path: 'facultades', component:FacultadesComponent},
  {path: 'FileEstudiante', component:FileEstudianteComponent},
  {path: 'Personas', component:PersonasComponent},
  {path: 'RegistroDocumentoDetalle', component:RegistroDocumentoDetalleComponent},
  {path: 'Reporte', component:ReporteComponent},
  {path: 'Universidades', component:UniversidadesComponent},
  {path: 'NotasEvaluas', component:NotasEvaluasComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaAdmisionesRegistroRoutingModule { }
