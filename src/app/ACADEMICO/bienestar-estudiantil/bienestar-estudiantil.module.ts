import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienestarEstudiantilRoutingModule } from './bienestar-estudiantil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { BecasComponent } from './components/becas/becas.component';
import { EstudiantebecaComponent } from './components/estudiantebeca/estudiantebeca.component';
import { EstudiantediscapacitadoComponent } from './components/estudiantediscapacitado/estudiantediscapacitado.component';
import { EstudiantedesercionComponent } from './components/estudiantedesercion/estudiantedesercion.component';
import { EstudianteabandonoComponent } from './components/estudianteabandono/estudianteabandono.component';
import { QuejasComponent } from './components/quejas/quejas.component';
import { CongeladosComponent } from './components/congelados/congelados.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [

    BecasComponent,
    EstudiantebecaComponent,
    EstudiantediscapacitadoComponent,
    EstudiantedesercionComponent,
    EstudianteabandonoComponent,
    QuejasComponent,
    CongeladosComponent,
  ],
  imports: [
    CommonModule,
    BienestarEstudiantilRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule
  ]
})
export class BienestarEstudiantilModule { }
