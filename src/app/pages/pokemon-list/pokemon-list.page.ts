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
  selectedType: string | null = null; // Nuevo campo para almacenar el tipo seleccionado

  constructor(private pokeapi: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
    this.getPokemonTypes();
  }

  // Obtener tipos
  getPokemonTypes(): void {
    this.pokeapi.getPokemonTypes().subscribe((data: any) => {
      this.pokemonTypes = data.results.map((type: any) => type.name.toLowerCase().replace(' ', ''));
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
      // Si se ha seleccionado un tipo, filtrar los Pokémon por ese tipo
      if (this.selectedType) {
        data = data.filter(pokemon => pokemon.types.some((type: any) => type.type.name.toLowerCase().replace(' ', '') === this.selectedType));
      }
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

  // Método para filtrar Pokémon por tipo cuando se selecciona un chip
  filterByType(type: string): void {
    this.selectedType = type.toLowerCase().replace(' ', ''); // Convertir el tipo seleccionado a minúsculas y sin espacios
    this.offset = 0; // Restablecer el offset al inicio
    this.pokemonList = []; // Limpiar la lista de Pokémon actual
    this.getPokemons(); // Obtener los Pokémon del tipo seleccionado
  }
}
