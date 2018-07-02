import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { NumismaticsComponent } from './content/numismatics/numismatics.component';

import { CountriesResolver } from './content/numismatics/countries.resolver';
import { PublicCollectionsResolver } from './content/numismatics/public-collections.resolver';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'numismatics',
    component: NumismaticsComponent,
    canActivate: [AuthGuard],
    resolve: {
      countries: CountriesResolver,
      publicCollections: PublicCollectionsResolver
    }
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
