import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { NumismaticsComponent } from './content/numismatics/numismatics.component';

const routes: Routes = [
  {
    path: 'numismatics',
    component: NumismaticsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', 
    redirectTo: '/numismatics', 
    pathMatch: 'full'
  },
  { 
    path: '**',
    redirectTo: '/numismatics', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
