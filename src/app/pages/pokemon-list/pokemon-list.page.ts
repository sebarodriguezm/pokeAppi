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

  getPokemons(offset: number = 0, limit: number = 25): void {
    const requests = [];
    for (let i = offset + 1; i <= offset + limit; i++) {
      requests.push(this.pokeapi.getPokemon(i));
    }
  
    forkJoin(requests).subscribe((data: any[]) => {
      console.log("Data received:", data); // Imprimir los datos recibidos
  
      if (this.selectedType) {
        data = data.filter(pokemon => {
          console.log("Pokemon types:", pokemon.types); // Imprimir los tipos de cada Pokémon
          return pokemon.types.some((type: any) => {
            return type.type.name.includes(this.selectedType) ;
          });
        });
      }
      this.pokemonList = this.pokemonList.concat(data);
      console.log("Filtered data:", this.pokemonList); // Imprimir los datos filtrados
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

  filterByType(type: string): void {
    this.selectedType = type; // Guarda el tipo seleccionado
  
    this.offset = 0; // Restablece el offset al inicio
    this.pokemonList = []; // Limpia la lista de Pokémon actual
  
    console.log("Selected type:", this.selectedType); // Imprimir el tipo seleccionado
  
    this.getPokemons(); // Obtiene los Pokémon del tipo seleccionado
  }
  
  
}
