import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../shared/pokemon.service';
import { Subscription, Observable } from 'rxjs';
import { PokemonType } from '../../shared/pokemonType.model';
import { PageEvent } from '@angular/material/paginator';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
    animations: [
      trigger('flip', [
        state('front', style({
          color: 'blue',
          transform: 'rotateY(0deg)'
        })),
        state('back', style({
          color: 'purple',
          transform: 'rotateY(180deg) scaleX(-1)',
        })),
        transition('front <=> back', animate(300)),
      ])
    ]
})

export class Pokemon implements OnInit, OnDestroy {
    state = 'front';
    completePokemon = [];
    pokemonSub: Subscription;
    pageSlice = [];

    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
      if (this.pokemonService.usedPokemon.length > 0) {
        this.pokemonService.usedPokemon.forEach((observs: Observable<PokemonType>) => {
          return this.pokemonSub = observs.subscribe(data => {
            console.log(data)
            this.pageSlice = this.completePokemon.slice(0, 25)
            let pokeObj = {
              name: data.name,
              id: data.id,
              image: data['sprites'].front_default,
              bigImage: data['sprites'].other['official-artwork'].front_default,
              abilities: data.abilities,
              species: data['species'],
              stats: data['stats'],
              state: this.state
            }
            this.completePokemon.push(pokeObj)
            return this.completePokemon.sort((a,b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
          })
        })
      } else {
        this.pokemonService.setPokemon();
        let pokemon = this.pokemonService.grabPokemon()
        pokemon.forEach((observs: Observable<PokemonType>) => {
          return this.pokemonSub = observs.subscribe(data => {
            console.log(data)
            this.pageSlice = this.completePokemon.slice(0, 25)
            let pokeObj = {
              name: data.name,
              id: data.id,
              image: data['sprites'].front_default,
              bigImage: data['sprites'].other['official-artwork'].front_default,
              abilities: data.abilities,
              species: data['species'],
              stats: data['stats'],
              state: this.state
            }
            this.completePokemon.push(pokeObj)
            return this.completePokemon.sort((a,b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
          })
        })
      }
        
      }

      onPageChange(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.completePokemon.length) {
          endIndex = this.completePokemon.length;
        }
        this.pageSlice = this.completePokemon.slice(startIndex, endIndex)
      }

      
      onFlipCard(index) {
        this.pageSlice[index].state === 'front' ? this.pageSlice[index].state = 'back' : this.pageSlice[index].state = 'front';
      }


      ngOnDestroy() {
        this.pokemonSub.unsubscribe();
      }
  
}