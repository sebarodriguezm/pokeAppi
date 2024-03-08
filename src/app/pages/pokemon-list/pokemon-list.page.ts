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
    this.pokeapi.getPokemons().subscribe((data: any) => {
      this.pokemonList = data;
      console.log('data', this.pokemonList);
    });
  }
}
