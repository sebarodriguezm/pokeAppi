import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<any> {
    return this.http.get<any>(`${environment.pokemonApi.baseUrl}${id}`);
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get<any>(`${environment.pokemonApi.baseUrl}pokemon-species/${id}`);
  }
  

  getEvolutionChain(id: number): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/type');
  }


}
