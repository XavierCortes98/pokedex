import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css'],
})
export class PokemonGridComponent {
  pokemonNumbers: number[];
  currentPage: number = 1;

  @Input() maxPokemon: number = 12;

  constructor() {
    this.pokemonNumbers = Array.from(
      { length: this.maxPokemon },
      (_, i) => i + 1
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.isScrollingNearBottom()) {
      console.log('END');
      this.loadMorePokemon();
    }
  }

  isScrollingNearBottom(): boolean {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      window.scrollY ||
      document.body.scrollTop + (document.documentElement.scrollTop || 0);

    return scrollTop + windowHeight >= documentHeight - 50;
  }

  loadMorePokemon(): void {
    const newPokemonNumbers = Array.from(
      { length: this.maxPokemon },
      (_, index) => this.currentPage * this.maxPokemon + index
    );
    console.log('new: ', newPokemonNumbers);
    this.pokemonNumbers = [...this.pokemonNumbers, ...newPokemonNumbers];
    this.currentPage++;
  }
}
