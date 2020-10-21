import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class PokemonService implements OnInit {
  public pokemon = [];
  public usedPokemon = [];
  private userData: User[] = [] 

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

  getUserData() {
    return this.http.get<{message: string, auth: User[]}>('http://localhost:3000/api/auth')
      .subscribe((userData) => {
        this.userData = userData.auth;
        console.log(this.userData)
      });
  };

  addUser(user) {
    return this.http.post<{message: string}>('http://localhost:3000/api/auth', user);
  }
}
