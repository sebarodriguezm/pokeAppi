import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.getPokemon(this.id);
    this.getEvolutionChain(this.id);
  }

  getPokemon(id: number) {
    this.pokeapi.getPokemon(id).subscribe((response) => {
      this.pokemon = response;
      this.getPokemonSpecies(response.id);
    }, (error) => {
      console.error('Error fetching Pokemon:', error);
    });
  }

  getPokemonSpecies(id: number) {
    this.pokeapi.getPokemonSpecies(id).subscribe((response) => {
      
      this.getEvolutionChain(id);
    }, (error) => {
      console.error('Error fetching Pokemon species:', error);
    });
  }

  getEvolutionChain(id:number) {
    this.pokeapi.getEvolutionChain(this.id).subscribe((response) => {
      this.evolutionChain = response.chain;
      console.log('Evolution chain:', this.evolutionChain);
    }, (error) => {
      console.error('Error fetching evolution chain:', error);
    });
  }
}
