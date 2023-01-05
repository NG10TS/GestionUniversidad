import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaAdmisionesRegistroRoutingModule } from './area-admisiones-registro-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SemestreComponent } from './components/semestre/semestre.component';
import { RevalidasComponent } from './components/revalidas/revalidas.component';
import { EgresadosComponent } from './components/egresados/egresados.component';
import { regisdocumentodocenteComponent } from './components/regisdocumentodocente/regisdocumentodocente.component';
import { EgresadotitulosComponent } from './components/egresadotitulos/egresadotitulos.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { EstadomateriaComponent } from './components/estadomateria/estadomateria.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { RegisdocumentoComponent } from './components/regisdocumento/regisdocumento.component';
import { PrerrequisitoComponent } from './components/prerrequisito/prerrequisito.component';
import { materiasComponent } from './components/materias/materias.component';
import { AsignacionEstudiantesComponent } from './components/asignacion-estudiantes/asignacion-estudiantes.component';
import { AdministrativosComponent } from './components/administrativos/administrativos.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { PersonasComponent } from './components/personas/personas.component';
import { FacultadesComponent } from './components/facultades/facultades.component';
import { RegistroDocumentoDetalleComponent } from './components/registro-documento-detalle/registro-documento-detalle.component';
import { FileEstudianteComponent } from './components/file-estudiante/file-estudiante.component';
import { UniversidadesComponent } from './components/universidades/universidades.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { BoletinComponent } from './components/boletin/boletin.component';
import { NotasEvaluasComponent } from './components/notas-evaluas/notas-evaluas.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DocentesComponent,
    EgresadosComponent,
    EgresadotitulosComponent,
    EstudiantesComponent,
    EstadomateriaComponent,
    SemestreComponent,
    RevalidasComponent,
    regisdocumentodocenteComponent,
    RegisdocumentoComponent,
    PrerrequisitoComponent,
    materiasComponent,
    AsignacionEstudiantesComponent,
    AdministrativosComponent,
    CarrerasComponent,
    PersonasComponent,
    FacultadesComponent,
    RegistroDocumentoDetalleComponent,
    UniversidadesComponent,
    FileEstudianteComponent,
    ReporteComponent,
    BoletinComponent,
    NotasEvaluasComponent,
  ],
  imports: [
    CommonModule,
    AreaAdmisionesRegistroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule,
  ]
})
export class AreaAdmisionesRegistroModule { }
