import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemonList: any[] = [];
  constructor(private pokeapi: PokemonService) {}

  ngOnInit() {
   this.getPokemons();
  }

  getPokemons(): void {
    for (let i = 1; i <= 151; i++) {
      this.pokeapi.getPokemon(i)
        .subscribe((data: any) => {
          this.pokemonList.push(data);
          console.log(this.pokemonList);
        });
    }
  }
}
