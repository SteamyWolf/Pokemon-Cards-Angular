import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PokemonService implements OnInit {
  public pokemon = [];
  public usedPokemon = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getPokemon() {
    for (let i = 1; i < 600; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      let pokeFetch = this.http.get(url);
      this.pokemon.push(pokeFetch);
    }
  }

  setPokemon() {
    this.usedPokemon = this.pokemon;
  }

  getOnePokemon(id) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  grabPokemon() {
    this.getPokemon();
    return this.pokemon;
  }

  getAbilityUrl(url) {
    return this.http.get(url)
  }
}
