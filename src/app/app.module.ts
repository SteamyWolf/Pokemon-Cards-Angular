import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonService } from './shared/pokemon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pokemon } from './components/pokemon/pokemon.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ability } from './components/ability/ability.component';
import { Header } from './components/header/header.component';
import { Specific } from './components/specific/specific.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpecificPokemon } from './components/specific/specific-pokemon/specific-pokemon.component';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Welcome } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    Pokemon,
    Ability,
    Header,
    Specific,
    SpecificPokemon,
    Welcome
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatPaginatorModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
