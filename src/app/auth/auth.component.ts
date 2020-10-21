import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PokemonService } from '../shared/pokemon.service';
import { User } from '../shared/user.model';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    form: FormGroup;
    message: string;
    loading: boolean = false;

    constructor(private pokeService: PokemonService) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
        })
        this.pokeService.getUserData();
        
    }

    submitForm(form: FormGroup) {
        this.loading = true;
        let math = Math.random() * 1000;
        let id = math.toString();
        this.pokeService.addUser({
            id: id,
            email: form.get('email').value,
            password: form.get('password').value
        }).subscribe((userData) => {
            form.markAsPending();
            setTimeout(() => {
                this.loading = false;
                this.message = userData.message;
                form.reset();
            }, 2000)
            form.markAsPristine()

        })
        
    }
}