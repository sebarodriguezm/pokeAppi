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
  constructor(
    private pokeapi: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.getPokemon(this.id);
  }

  getPokemon(id:number){
    this.pokeapi.getPokemon(id).subscribe((response) => {
      this.pokemon = response;
      console.log('pokemon', this.pokemon);
    }, (error) => {
      console.error('Error fetching Pokemon:', error);
    });
  }
}
