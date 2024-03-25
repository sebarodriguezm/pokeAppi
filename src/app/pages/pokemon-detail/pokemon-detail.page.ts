import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  id: number = 0;
  pokemon: any = {};
  evolutionChain: any[] = [];

  constructor(
    private pokeapi: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getPokemonDetails(this.id);
  }

  getPokemonDetails(id: number) {
    this.pokeapi.getPokemon(id).pipe(
      switchMap(pokemon => {
        this.pokemon = pokemon;
        return this.pokeapi.getPokemonSpecies(id);
      }),
      switchMap(species => {
        // Puedes realizar más operaciones aquí si es necesario
        return this.pokeapi.getEvolutionChain(id);
      })
    ).subscribe(
      evolutionChain => {
        this.evolutionChain = evolutionChain.chain;
        console.log('Evoluciones:', this.evolutionChain);
      },
      error => {
        console.error('Error obteniendo los datos del pokemon:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }
}
