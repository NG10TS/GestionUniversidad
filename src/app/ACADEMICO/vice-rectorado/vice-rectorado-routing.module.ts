import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvContenidosComponent } from './components/Convalidaciones/conv-contenidos/conv-contenidos.component';
import { ConvConvalidarComponent } from './components/Convalidaciones/conv-convalidar/conv-convalidar.component';
import { ConvEstudiantesComponent } from './components/Convalidaciones/conv-estudiantes/conv-estudiantes.component';
import { ConvRegistrarComponent } from './components/Convalidaciones/conv-registrar/conv-registrar.component';
import { EstadoConvComponent } from './components/Convalidaciones/estado-conv/estado-conv.component';
import { PlaninscripcionComponent } from './components/planinscripcion/planinscripcion.component';

const routes: Routes = [

  {path: 'ConvRegistrar', component:ConvRegistrarComponent},
  {path: 'ConvContenidos', component:ConvContenidosComponent},
  {path: 'ConvConvalidar', component:ConvConvalidarComponent},
  {path: 'ConvEstudiantes', component:ConvEstudiantesComponent},
  {path: 'Planinscripcion', component:PlaninscripcionComponent},
  {path: 'ConvEstado', component:EstadoConvComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViceRectoradoRoutingModule { }
