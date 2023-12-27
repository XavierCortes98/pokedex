import { Component, OnInit } from '@angular/core';
import { pokemonInfoService } from '../services/cardInfo/cardInfo.service';
import { cardInfoModel } from '../models/cardInfo.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  pokemonNames: cardInfoModel[] = [];

  constructor(private pokemonInfoService: pokemonInfoService) {}

  ngOnInit(): void {
    this.fecthAllPokemon();
  }

  fecthAllPokemon() {
    for (let i = 1; i < 1025; i++) {
      this.pokemonInfoService.getPokemonCardInfo(i).subscribe({
        next: (data) => {
          console.log(data.name);
          this.pokemonNames.push(data);
        },
        complete: () => console.log('pokemon list: ', this.pokemonNames),
      });
    }
  }
}
