import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirInteraccionSocialRoutingModule } from './dir-interaccion-social-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [

    CategoriasComponent,
    EventosComponent,
  ],
  imports: [
    CommonModule,
    DirInteraccionSocialRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule
  ]
})
export class DirInteraccionSocialModule { }
