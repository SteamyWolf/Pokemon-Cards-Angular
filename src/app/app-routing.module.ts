import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pokemon } from './components/pokemon/pokemon.component';
import { Specific } from './components/specific/specific.component';

const routes: Routes = [
  {
    path: 'cards', component: Pokemon
  },
  {
    path: 'choose', component: Specific
  },
  {
    path: '', redirectTo: 'cards', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
