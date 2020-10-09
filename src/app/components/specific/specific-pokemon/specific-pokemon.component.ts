import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PokemonService } from 'src/app/shared/pokemon.service';

@Component({
    selector: 'specific-pokemon',
    templateUrl: './specific-pokemon.component.html',
    styleUrls: ['./specific-pokemon.component.scss']
})

export class SpecificPokemon implements OnInit, OnChanges {
    @Input() id: number;
    pokemon: any;

    constructor(private pokemonService: PokemonService) {}

    ngOnInit() {}

    ngOnChanges() {
        if (this.id) {
            return this.pokemonService.getOnePokemon(this.id).subscribe(pokemon => {
                return this.pokemon = pokemon;
            })
        } else {
            return this.pokemonService.getOnePokemon(1).subscribe(pokemon => {
                return this.pokemon = pokemon
            })
        }
    }
}