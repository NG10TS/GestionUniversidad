import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionmatService } from './services/ACADEMICO/area-admisiones-registro/asignacionmat.service';
import { DocentesService } from './services/ACADEMICO/area-admisiones-registro/docentes.service';
import { MateriasService } from './services/ACADEMICO/area-admisiones-registro/materias.service';
import { SemestreService } from './services/ACADEMICO/area-admisiones-registro/semestre.service';
import { CarrerasService } from './services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from './services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { CargosAdminService } from './services/ACADEMICO/administrativos/cargos-admin.service';
import { SalariosAdminService } from './services/ACADEMICO/administrativos/salarios-admin.service';
import { CarreraOrigenService } from './services/ACADEMICO/vice-rectorado/carrera-origen.service';
import { MateriaOrigenService } from './services/ACADEMICO/vice-rectorado/materia-origen.service';
import { UniversidadOrigenService } from './services/ACADEMICO/vice-rectorado/universidad-origen.service';
import { ConvEstudiantesService } from './services/ACADEMICO/vice-rectorado/conv/conv-estudiantes.service';
import { ConvEstUniCarrerasService } from './services/ACADEMICO/vice-rectorado/conv/conv-est-uni-carreras.service';
import { AsignacionEstudiantesService } from './services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { EstudiantedesercionService } from './services/ACADEMICO/bienestar-estudiantil/estudiantedesercion.service';
import { AdministrativosService } from './services/ACADEMICO/area-admisiones-registro/administrativos.service';
import { EgresadosService } from './services/ACADEMICO/area-admisiones-registro/Egresados.service';
import { UniversidadesService } from './services/ACADEMICO/area-admisiones-registro/universidades.service';
import { EgresadoTitulosService } from './services/ACADEMICO/area-admisiones-registro/egresado-titulos.service';
import { RegisdocumentoService } from './services/ACADEMICO/area-admisiones-registro/regisdocumento.service';
import { RegisdocumentodocenteService } from './services/ACADEMICO/area-admisiones-registro/regisdocumentodocente.service';
import { RevalidasService } from './services/ACADEMICO/area-admisiones-registro/Revalidas.service';
import { BecasService } from './services/ACADEMICO/bienestar-estudiantil/becas.service';
import { EstudianteabandonoService } from './services/ACADEMICO/bienestar-estudiantil/estudianteabandono.service';
import { EstudiantebecaService } from './services/ACADEMICO/bienestar-estudiantil/estudiantebeca.service';
import { EstudiantediscapacitadoService } from './services/ACADEMICO/bienestar-estudiantil/estudiantediscapacitado.service';
import { QuejasService } from './services/ACADEMICO/bienestar-estudiantil/quejas.service';
import { CategoriasService } from './services/ACADEMICO/dir-interaccion-social/categorias.service';
import { EventosService } from './services/ACADEMICO/dir-interaccion-social/eventos.service';
import { PlanEService } from './services/ACADEMICO/secre-vice-rectorado/plan-e.service';
import { PlaninscripcionService } from './services/ACADEMICO/vice-rectorado/planinscripcion.service';
import { FacultadesService } from './services/ACADEMICO/area-admisiones-registro/facultades.service';
import { PersonasService } from './services/ACADEMICO/area-admisiones-registro/personas.service';
import { ConvRegistrarService } from './services/ACADEMICO/vice-rectorado/conv/conv-registrar.service';
import { RegisDocumentoDetalleService } from './services/ACADEMICO/area-admisiones-registro/regisDocumentoDetalle.service';
import { CodPlanesService } from './services/ACADEMICO/secre-vice-rectorado/cod-planes.service';
import { docenteseguiminetoService } from './services/ACADEMICO/administrativos/docenteseguimineto.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AsignacionmatService,
    DocentesService,
    EstudiantesService,
    MateriasService,
    AsignacionEstudiantesService,
    SemestreService,
    CarrerasService,
    CargosAdminService,
    SalariosAdminService,
    AdministrativosService,
    EgresadosService,
    EgresadoTitulosService,
    UniversidadesService,
    RegisdocumentoService,
    RegisdocumentodocenteService,
    RevalidasService,
    FacultadesService,
    PersonasService,
    RegisDocumentoDetalleService,
    docenteseguiminetoService,
    //BIENESTAR ESTUDIANTIL
    BecasService,
    EstudianteabandonoService,
    EstudiantebecaService,
    EstudiantedesercionService,
    EstudiantediscapacitadoService,
    QuejasService,
    //DIR INTERACCION SOCIAL
    CategoriasService,
    EventosService,
    //SECRE VICE RECTORADO
    PlanEService,
    CodPlanesService,
    //VICE RECTORADO
    ConvEstudiantesService,
    ConvEstUniCarrerasService,
    ConvRegistrarService,
    CarreraOrigenService,
    MateriaOrigenService,
    PlaninscripcionService,
    UniversidadOrigenService,

  ]
})
export class CoreModule { }
