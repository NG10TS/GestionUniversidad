import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {HerramientasService} from "./core/services/herramientas.service"; //PARA LLAMAR AL SERVICIO Q PERMITE CARGAR SCRIPT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PdfViewerModule}  from  'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {NgxPaginationModule} from 'ngx-pagination';
import { VisorPDFComponent } from './PUBLICAS/visor-pdf/visor-pdf.component';
import { PDFMakerComponent } from './PARA_DESARROLLO/pdfmaker/pdfmaker.component';
import { ContentComponent } from './PARA_DESARROLLO/disenio general/content/content.component';
import { PruebasComponent } from './PARA_DESARROLLO/pruebas/pruebas.component';
import { InicioComponent } from './PUBLICAS/inicio/inicio.component';
import { ContactosComponent } from './PUBLICAS/contactos/contactos.component';
import { EstudianteComponent } from './PUBLICAS/estudiante/estudiante.component';
import { InscripcionComponent } from './PUBLICAS/inscripcion/inscripcion.component';
import { InterfacesBaseComponent } from './PARA_DESARROLLO/interfaces-base/interfaces-base.component';
import { Modulo4Component } from './PUBLICAS/modulo4/modulo4.component';
import { Modulo3Component } from './PUBLICAS/modulo3/modulo3.component';
import { Modulo2Component } from './PUBLICAS/modulo2/modulo2.component';
import { Modulo1Component } from './PUBLICAS/modulo1/modulo1.component';
import { InicioEComponent } from './PUBLICAS/inicio-e/inicio-e.component';
import { HeaderComponent } from './PARA_DESARROLLO/disenio general/header/header.component';
import { MenuComponent } from './PARA_DESARROLLO/disenio general/menu/menu.component';
import { SettingComponent } from './PARA_DESARROLLO/disenio general/setting/setting.component';
import { FooterComponent } from './PARA_DESARROLLO/disenio general/footer/footer.component';
import { LayoutPublicosComponent } from './PUBLICAS/layout-publicos/layout-publicos.component';
import { InscripcionantiguoComponent } from './PUBLICAS/inscripcionantiguo/inscripcionantiguo.component';
import { InscripcionesnuevosComponent } from './PUBLICAS/inscripcionesnuevos/inscripcionesnuevos.component';

import { HttpClientModule } from '@angular/common/http';
import { AdminsLayoutComponent } from './PARA_DESARROLLO/Layouts/AdminsLayout/AdminsLayout.component';
import { MenuadminsComponent } from './PARA_DESARROLLO/disenio general/Menuadmins/Menuadmins.component';
import { PublicLayoutComponent } from './PARA_DESARROLLO/Layouts/PublicLayout/PublicLayout.component';
import { PostgradoModule } from './ACADEMICO/postgrado/postgrado.module';
import { DiseniosHtmlComponent } from './PARA_DESARROLLO/DiseniosHtml/DiseniosHtml.component';
import { PerfilComponent } from './PRIVADAS/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InscripcionesPostgradoComponent } from './PUBLICAS/inscripciones-postgrado/inscripciones-postgrado.component';
import { CondominiosOntologicosModule } from './ACADEMICO/condominios-ontologicos/condominios-ontologicos.module';
import { FooterEstudiantesComponent } from './PARA_DESARROLLO/DisenioEstudiantes/FooterEstudiantes/FooterEstudiantes.component';
import { HeaderEstudiantesComponent } from './PARA_DESARROLLO/DisenioEstudiantes/HeaderEstudiantes/HeaderEstudiantes.component';
import { MenuEstudiantesComponent } from './PARA_DESARROLLO/DisenioEstudiantes/MenuEstudiantes/MenuEstudiantes.component';
import { PostgradoLayoutComponent } from './PARA_DESARROLLO/Layouts/PostgradoLayout/PostgradoLayout.component';
import { PageAccessComponent } from './PRIVADAS/page-access/page-access.component';
import { DatosPersonalesComponent } from './PRIVADAS/datos-personales/datos-personales.component';
import { HorarioComponent } from './PRIVADAS/horario/horario.component';
import { ModificarMateriasComponent } from './PRIVADAS/modificar-materias/modificar-materias.component';
import { MateriasRegistradasComponent } from './PRIVADAS/materias-registradas/materias-registradas.component';
import { BienvenidoComponent } from './PRIVADAS/bienvenido/bienvenido.component';
import { PasswordChangeComponent } from './PRIVADAS/password-change/password-change.component';
import { MisCursosPostgradoComponent } from './PRIVADAS/Postgrado/mis-cursos-postgrado/mis-cursos-postgrado.component';
import { MisProgramasPostgradoComponent } from './PRIVADAS/Postgrado/mis-programas-postgrado/mis-programas-postgrado.component';
//import { PresComponent } from './ACADEMICO/administrativos/components/POA/pres/pres.component';
//import { CateProductoPoasComponent } from './POA/cate-producto-poas/cate-producto-poas.component';
//import { CateProductoPoasComponent } from './POA/cate-producto-poas/cate-producto-poas/cate-producto-poas.component';



@NgModule({
  declarations: [
    AppComponent,
    VisorPDFComponent,
    PDFMakerComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    SettingComponent,
    PruebasComponent,
    InicioComponent,
    ContactosComponent,
    InicioEComponent,
    Modulo1Component,
    Modulo2Component,
    Modulo3Component,
    Modulo4Component,
    EstudianteComponent,
    InscripcionComponent,
    InterfacesBaseComponent,
    LayoutPublicosComponent,
    InscripcionantiguoComponent,
    InscripcionesnuevosComponent,
    AdminsLayoutComponent,
    MenuadminsComponent,
    PublicLayoutComponent,
    DiseniosHtmlComponent,
    PerfilComponent,
    InscripcionesPostgradoComponent,
    PostgradoLayoutComponent,
    FooterEstudiantesComponent,
    HeaderEstudiantesComponent,
    MenuEstudiantesComponent,
    PageAccessComponent,
    DatosPersonalesComponent,
    HorarioComponent,
    ModificarMateriasComponent,
    MateriasRegistradasComponent,
    BienvenidoComponent,
    PasswordChangeComponent,
    MisCursosPostgradoComponent,
    MisProgramasPostgradoComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    PostgradoModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CondominiosOntologicosModule
  ],
  providers: [
    HerramientasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
