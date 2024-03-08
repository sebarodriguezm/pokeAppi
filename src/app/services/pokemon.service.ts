import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(offset = 0) {
    return this.http.get<any>(`${environment.pokemonApi.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map((response):any => response.results) //se usa pipe y map para filtrar y solo deolverlo los datos alojados en results, es mas eficiente
    );
  }
}
