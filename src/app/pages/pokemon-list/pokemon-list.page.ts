import { Component, OnInit } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  selectedType: string | null = null;

  constructor(private pokeapi: PokemonService) {}

  ngOnInit() {
    this.getPokemonTypes();
    this.loadPokemons();
  }

  getPokemonTypes(): void {
    this.pokeapi.getPokemonTypes().pipe(
      catchError(error => {
        console.error('Error obteniendo los tipos:', error);
        return throwError(error);
      })
    ).subscribe((data: any) => {
      this.pokemonTypes = data.results.map((type: any) => type.name.toLowerCase().replace(' ', ''));
    });
  }

  loadPokemons(): void {
    const requests = [];
    for (let i = this.offset + 1; i <= this.offset + 25; i++) {
      requests.push(this.pokeapi.getPokemon(i));
    }
  
    forkJoin(requests).pipe(
      catchError(error => {
        console.error('Error obteniendo datos de los pokemon:', error);
        return throwError(error);
      })
    ).subscribe((data: any[]) => {
      if (this.selectedType) {
        data = data.filter(pokemon => {
          return pokemon.types.some((type: any) => {
            return type.type.name.includes(this.selectedType);
          });
        });
      }
      this.pokemonList.push(...data);
    });
  }

  loadMorePokemons(event: any): void {
    this.offset += 25;
    this.loadPokemons();

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  filterByType(type: string): void {
    this.selectedType = type;
    this.offset = 0;
    this.pokemonList = [];

    this.loadPokemons();
  }

  getCardClass(pokemon: any): string {
    if (pokemon.types && pokemon.types.length > 0) {
      return `${pokemon.types[0].type.name.toLowerCase()}-background`;
    }
    return '';
  }
}
