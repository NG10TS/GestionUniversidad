import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViceRectoradoRoutingModule } from './vice-rectorado-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvRegistrarComponent } from './components/Convalidaciones/conv-registrar/conv-registrar.component';
import { ConvContenidosComponent } from './components/Convalidaciones/conv-contenidos/conv-contenidos.component';
import { ConvConvalidarComponent } from './components/Convalidaciones/conv-convalidar/conv-convalidar.component';
import { ConvEstudiantesComponent } from './components/Convalidaciones/conv-estudiantes/conv-estudiantes.component';
import { CoreModule } from 'src/app/core/core.module';
import { PlaninscripcionComponent } from './components/planinscripcion/planinscripcion.component';
import { EstadoConvComponent } from './components/Convalidaciones/estado-conv/estado-conv.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ConvRegistrarComponent,
    ConvContenidosComponent,
    ConvConvalidarComponent,
    ConvEstudiantesComponent,
    PlaninscripcionComponent,
    EstadoConvComponent,
  ],
  imports: [
    CommonModule,
    ViceRectoradoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgxPaginationModule,
  ]
})
export class ViceRectoradoModule { }
