import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EventosComponent } from './components/eventos/eventos.component';

const routes: Routes = [
  {path: 'Categorias', component:CategoriasComponent},
  {path: 'Eventos', component:EventosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirInteraccionSocialRoutingModule { }
