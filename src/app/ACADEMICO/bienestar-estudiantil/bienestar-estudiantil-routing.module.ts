import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecasComponent } from './components/becas/becas.component';
import { EstudianteabandonoComponent } from './components/estudianteabandono/estudianteabandono.component';
import { EstudiantebecaComponent } from './components/estudiantebeca/estudiantebeca.component';
import { EstudiantedesercionComponent } from './components/estudiantedesercion/estudiantedesercion.component';
import { EstudiantediscapacitadoComponent } from './components/estudiantediscapacitado/estudiantediscapacitado.component';
import { QuejasComponent } from './components/quejas/quejas.component';
import { CongeladosComponent } from './components/congelados/congelados.component';

const routes: Routes = [
  {path: 'becas', component:BecasComponent},
  {path: 'Estudiantebeca', component:EstudiantebecaComponent},
  {path: 'Estudiantediscapacitado', component:EstudiantediscapacitadoComponent},
  {path: 'Estudiantedesercion', component:EstudiantedesercionComponent},
  {path: 'Estudianteabandono', component:EstudianteabandonoComponent},
  {path: 'Quejas', component:QuejasComponent},
  {path: 'Congelados', component:CongeladosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienestarEstudiantilRoutingModule { }
