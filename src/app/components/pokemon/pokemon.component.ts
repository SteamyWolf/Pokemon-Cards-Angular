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
      ]),
      trigger('expandDiv', [
        state('no', style({
          height: 'fit-content'
        })),
        state('yes', style({
          height: 'fit-content'
        })),
        transition('no <=> yes', animate(300))
      ]),
      trigger('chevron', [
        state('down', style({
          transform: 'rotateX(0deg)'
        })),
        state('up', style({
          transform: 'rotateX(180deg)'
        })),
        transition('down <=> up', animate(3000))
      ])
    ]
})

export class Pokemon implements OnInit, OnDestroy {
    state = 'front';
    expanded = 'no';
    chevron = 'down';
    completePokemon = [];
    pokemonSub: Subscription;
    pageSlice = [];
    toggled: boolean = false;

    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
      if (this.pokemonService.usedPokemon.length > 0) {
        this.pokemonService.usedPokemon.forEach((observs: Observable<PokemonType>) => {
          return this.pokemonSub = observs.subscribe(data => {
            this.pageSlice = this.completePokemon.slice(0, 25)
            let pokeObj = {
              name: data.name,
              id: data.id,
              image: data['sprites'].front_default,
              bigImage: data['sprites'].other['official-artwork'].front_default,
              abilities: data.abilities,
              species: data['species'],
              stats: data['stats'],
              state: this.state,
              games: data['game_indices']
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
            this.pageSlice = this.completePokemon.slice(0, 25)
            let pokeObj = {
              name: data.name,
              id: data.id,
              image: data['sprites'].front_default,
              bigImage: data['sprites'].other['official-artwork'].front_default,
              abilities: data.abilities,
              species: data['species'],
              stats: data['stats'],
              state: this.state,
              games: data['game_indices']
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

      expand(index, event) {
        this.pageSlice[index].state = 'front';
        this.toggled = !this.toggled;
        this.expanded === 'no' ? this.expanded = 'yes' : this.expanded = 'no';
        this.chevron === 'down' ? this.chevron = 'up' : this.chevron = 'down';
      }


      ngOnDestroy() {
        this.pokemonSub.unsubscribe();
      }
  
}