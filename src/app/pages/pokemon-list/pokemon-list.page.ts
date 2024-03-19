import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemonList: any[] = [];
  pokemonTypes: string[] = [];
  offset: number = 0;

  constructor(private pokeapi: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
    this.getPokemonTypes();
  }

  // Obtener tipos
  getPokemonTypes(): void {
    this.pokeapi.getPokemonTypes().subscribe((data: any) => {
      this.pokemonTypes = data.results.map((type: any) => type.name);
    });
  }

  // Obtener pokemon
  getPokemons(offset: number = 0, limit: number = 25): void {
    const requests = [];
    for (let i = offset + 1; i <= offset + limit; i++) {
      requests.push(this.pokeapi.getPokemon(i));
    }
    // se usa forkjoin para que se carguen todos en paralelo y luego se guarda todo en pokemonList
    forkJoin(requests).subscribe((data: any[]) => {
      this.pokemonList = this.pokemonList.concat(data);
      console.log(this.pokemonList);
    });
  }
  
  loadMorePokemons(event: any): void {
    this.offset += 25; // Incrementar el offset para obtener el siguiente lote de Pokémon
    this.getPokemons(this.offset); // Cargar más Pokémon con el nuevo offset

    // Finalizar el evento de carga infinita
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
