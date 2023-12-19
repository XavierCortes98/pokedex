import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css'],
})
export class PokemonGridComponent {
  pokemonNumbers: number[];

  @Input() maxPokemon: number = 12;

  constructor() {
    this.pokemonNumbers = Array.from(
      { length: this.maxPokemon },
      (_, i) => i + 1
    );
  }
}
