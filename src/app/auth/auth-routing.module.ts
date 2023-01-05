import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPostgradoComponent } from './components/login-postgrado/login-postgrado.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'IngresoPostgrado', component:LoginPostgradoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
