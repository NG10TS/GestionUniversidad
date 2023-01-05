import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionDocentesComponent } from './components/asignacion-docentes/asignacion-docentes.component';
import { CalendariosComponent } from './components/calendarios/calendarios.component';
import { CronogramasComponent } from './components/cronogramas/cronogramas.component';
import { DetalleCalendariosComponent } from './components/detalle-calendarios/detalle-calendarios.component';
import { FechaEvaluasComponent } from './components/fecha-evaluas/fecha-evaluas.component';
import { FechasComponent } from './components/fechas/fechas.component';
import { PlanEComponent } from './components/plan-e/plan-e.component';

const routes: Routes = [
  {path: 'AsignacionDocentes', component:AsignacionDocentesComponent},
  {path: 'plan-e', component:PlanEComponent},
  {path: 'Calendarios', component:CalendariosComponent},
  {path: 'DetalleCalendarios', component:DetalleCalendariosComponent},
  {path: 'Cronogramas', component:CronogramasComponent},
  {path: 'Fechas', component:FechasComponent},
  {path: 'FechaEvaluas', component:FechaEvaluasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecreViceRectoradoRoutingModule { }
