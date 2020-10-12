import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/shared/pokemon.service';

@Component({
    selector: 'app-ability',
    templateUrl: './ability.component.html',
    styles: ["p {font-family: 'Grandstander', cursive;}"]
})

export class Ability implements OnInit {
    @Input() url:string;
    @Input() name: string;
    text: string = '';

    constructor(private pokemonService: PokemonService) {}

    ngOnInit() {
        this.name.toUpperCase();
        return this.pokemonService.getAbilityUrl(this.url)
            .subscribe(data => {
                let englishOnly = data['flavor_text_entries'].filter(text => text.language.name === 'en');
                this.text = englishOnly[0].flavor_text
            })
    }
}