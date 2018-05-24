import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumismaticsComponent } from './content/numismatics/numismatics.component';

const routes: Routes = [
  {
    path: '',
    component: NumismaticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
