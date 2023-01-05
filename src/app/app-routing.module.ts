import { MisProgramasPostgradoComponent } from './PRIVADAS/Postgrado/mis-programas-postgrado/mis-programas-postgrado.component';
import { MisCursosPostgradoComponent } from './PRIVADAS/Postgrado/mis-cursos-postgrado/mis-cursos-postgrado.component';
import { PasswordChangeComponent } from './PRIVADAS/password-change/password-change.component';
import { BienvenidoComponent } from './PRIVADAS/bienvenido/bienvenido.component';
import { ModificarMateriasComponent } from './PRIVADAS/modificar-materias/modificar-materias.component';
import { MateriasRegistradasComponent } from './PRIVADAS/materias-registradas/materias-registradas.component';
import { MateriaspendientesComponent } from './ACADEMICO/administrativos/components/materiaspendientes/materiaspendientes.component';
import { DatosPersonalesComponent } from './PRIVADAS/datos-personales/datos-personales.component';
import { PageAccessComponent } from './PRIVADAS/page-access/page-access.component';
import { CondominiosOntologicosModule } from './ACADEMICO/condominios-ontologicos/condominios-ontologicos.module';
import { InscripcionesPostgradoComponent } from './PUBLICAS/inscripciones-postgrado/inscripciones-postgrado.component';
import { PerfilComponent } from './PRIVADAS/perfil/perfil.component';
import { DiseniosHtmlComponent } from './PARA_DESARROLLO/DiseniosHtml/DiseniosHtml.component';
import { AreaAdmisionesRegistroModule } from './ACADEMICO/area-admisiones-registro/area-admisiones-registro.module';
import { ContactosComponent } from './PUBLICAS/contactos/contactos.component';
import { InicioComponent } from './PUBLICAS/inicio/inicio.component';
import { PruebasComponent } from './PARA_DESARROLLO/pruebas/pruebas.component';
import { VisorPDFComponent } from './PUBLICAS/visor-pdf/visor-pdf.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './PUBLICAS/estudiante/estudiante.component';
import { InscripcionComponent } from './PUBLICAS/inscripcion/inscripcion.component';
import { InterfacesBaseComponent } from './PARA_DESARROLLO/interfaces-base/interfaces-base.component';
import { InicioEComponent } from './PUBLICAS/inicio-e/inicio-e.component';
import { Modulo1Component } from './PUBLICAS/modulo1/modulo1.component';
import { Modulo2Component } from './PUBLICAS/modulo2/modulo2.component';
import { Modulo3Component } from './PUBLICAS/modulo3/modulo3.component';
import { Modulo4Component } from './PUBLICAS/modulo4/modulo4.component';
import { LayoutPublicosComponent } from './PUBLICAS/layout-publicos/layout-publicos.component';
import { InscripcionantiguoComponent } from './PUBLICAS/inscripcionantiguo/inscripcionantiguo.component';
import { InscripcionesnuevosComponent } from './PUBLICAS/inscripcionesnuevos/inscripcionesnuevos.component';
import { PDFMakerComponent } from './PARA_DESARROLLO/pdfmaker/pdfmaker.component';
import { AdminsLayoutComponent } from './PARA_DESARROLLO/Layouts/AdminsLayout/AdminsLayout.component';
import { PublicLayoutComponent } from './PARA_DESARROLLO/Layouts/PublicLayout/PublicLayout.component';
import { PostgradoLayoutComponent } from './PARA_DESARROLLO/Layouts/PostgradoLayout/PostgradoLayout.component';
import { HorarioComponent } from './PRIVADAS/horario/horario.component';


const routes: Routes = [
  {path:'',component:PublicLayoutComponent,children:[
    {path: 'LibroPDF', component:VisorPDFComponent},
    {path: 'InicioE', component:InicioEComponent},
    {path: 'Contactos', component:ContactosComponent},
    {path: 'modulo1', component:Modulo1Component},
    {path: 'modulo2', component:Modulo2Component},
    {path: 'modulo3', component:Modulo3Component},
    {path: 'modulo4', component:Modulo4Component},
    {path: 'estudiante', component:EstudianteComponent},
    {path: 'inscripcion', component:InscripcionComponent},
    {path: 'inscripcionantiguo', component:InscripcionantiguoComponent},
    {path: 'inscripcionesnuevos', component:InscripcionesnuevosComponent},
    {path: 'inscripcionespostgrado', component:InscripcionesPostgradoComponent},
    {path: 'pdfmake', component:PDFMakerComponent},
    {path: 'Pruebas', component:PruebasComponent},
    {path: 'base', component:InterfacesBaseComponent},
    {path: 'diseniohtml', component:DiseniosHtmlComponent},
    {path: 'admin/Access', component:PageAccessComponent},
    {path: 'Perfil', component:PerfilComponent},
    // {path: '**', component:InicioComponent},
  ]},

  {path:'',children:[
    {path: 'auth',loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  ]},

  {path:'admin',component:AdminsLayoutComponent,children:[
    {path: '',loadChildren:() => import('./ACADEMICO/administrativos/administrativos.module').then(m => m.AdministrativosModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/area-admisiones-registro/area-admisiones-registro.module').then(m => m.AreaAdmisionesRegistroModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/bienestar-estudiantil/bienestar-estudiantil.module').then(m => m.BienestarEstudiantilModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/dir-interaccion-social/dir-interaccion-social.module').then(m => m.DirInteraccionSocialModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/secre-vice-rectorado/secre-vice-rectorado.module').then(m => m.SecreViceRectoradoModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/vice-rectorado/vice-rectorado.module').then(m => m.ViceRectoradoModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/postgrado/postgrado.module').then(m => m.PostgradoModule)},
    {path: '',loadChildren:() => import('./ACADEMICO/condominios-ontologicos/condominios-ontologicos.module').then(m => m.CondominiosOntologicosModule)},
  ]},
  {path:'postgrado',component:PostgradoLayoutComponent,children:[
    {path: 'Personal', component:DatosPersonalesComponent},
    {path: 'Horario', component:HorarioComponent},
    {path: 'Materias', component:MateriasRegistradasComponent},
    {path: 'EditarMaterias', component:ModificarMateriasComponent},
    {path: 'Bienvenido', component:BienvenidoComponent},
    {path: 'Perfil', component:PerfilComponent},
    {path: 'PasswordChange', component:PasswordChangeComponent},

    {path: 'MisCursos', component:MisCursosPostgradoComponent},
    {path: 'MisProgramas', component:MisProgramasPostgradoComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //import { PresComponent } from './ACADEMICO/administrativos/components/POA/pres/pres.component';
exports: [RouterModule]
})
export class AppRoutingModule { }
