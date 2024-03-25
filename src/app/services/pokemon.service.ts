import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon/${id}`);
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon-species/${id}`);
  }

  getEvolutionChain(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}evolution-chain/${id}`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}type`);
  }
}
