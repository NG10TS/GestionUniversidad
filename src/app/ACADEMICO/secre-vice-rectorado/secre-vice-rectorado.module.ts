import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecreViceRectoradoRoutingModule } from './secre-vice-rectorado-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignacionDocentesComponent } from './components/asignacion-docentes/asignacion-docentes.component';
import { CoreModule } from 'src/app/core/core.module';
import { PlanEComponent } from './components/plan-e/plan-e.component';
import { CalendariosComponent } from './components/calendarios/calendarios.component';
import { CronogramasComponent } from './components/cronogramas/cronogramas.component';
import { DetalleCalendariosComponent } from './components/detalle-calendarios/detalle-calendarios.component';
import { FechasComponent } from './components/fechas/fechas.component';
import { FechaEvaluasComponent } from './components/fecha-evaluas/fecha-evaluas.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AsignacionDocentesComponent,
    PlanEComponent,
    CalendariosComponent,
    CronogramasComponent,
    DetalleCalendariosComponent,
    FechasComponent,
    FechaEvaluasComponent,
  ],
  imports: [
    CommonModule,
    SecreViceRectoradoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule
  ]
})
export class SecreViceRectoradoModule { }
