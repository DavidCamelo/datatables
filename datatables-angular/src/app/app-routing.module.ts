import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './page/car/car.component';

const routes: Routes = [
  { path: '', redirectTo: 'car', pathMatch: 'full' },
  { path: 'car', component: CarComponent },
  { path: '**', redirectTo: 'car' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
