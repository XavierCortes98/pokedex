import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { pokemonInfoService } from 'src/app/services/cardInfo/cardInfo.service';
import { SearchType } from '../../../models/searchType.enum';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css'],
})
export class PokemonGridComponent implements OnInit {
  searchType = SearchType.fetchAll;

  pokemonNumbers: number[];
  currentPage = 1;
  pokemonNames: string[] = [];

  searchForm: FormGroup;
  fillInput: Observable<string[]>;

  pokemonName: string;

  @Input() maxPokemon = 12;

  public get searchTypeEnum(): typeof SearchType {
    return SearchType;
  }

  constructor(
    private formBuilder: FormBuilder,
    private pokemonInfoService: pokemonInfoService
  ) {
    this.pokemonNumbers = Array.from(
      { length: this.maxPokemon },
      (_, i) => i + 1
    );
  }

  ngOnInit() {
    this.fecthAllPokemon();
    this.createForm();
    this.fillInput = this.searchForm.valueChanges.pipe(
      startWith(''),
      map(() => this._filter(this.searchForm.get('pokemonName')?.value))
    );
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      pokemonName: [''],
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrollingNearBottom()) {
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
    const lastPokemonNumber =
      this.pokemonNumbers[this.pokemonNumbers.length - 1];
    const newPokemonNumbers = Array.from(
      { length: this.maxPokemon },
      (_, index) => lastPokemonNumber + 1 + index
    );
    console.log('new: ', newPokemonNumbers);
    this.pokemonNumbers = [...this.pokemonNumbers, ...newPokemonNumbers];
    this.currentPage++;
  }

  fecthAllPokemon() {
    for (let i = 1; i < 1025; i++) {
      this.pokemonInfoService.getPokemonCardInfo(i).subscribe({
        next: (data) => {
          this.pokemonNames.push(
            data.name.charAt(0).toLocaleUpperCase() +
              data.name.slice(1).toLowerCase()
          );
        },
        // complete: () => console.log('pokemon list: ', this.pokemonNames),
      });
    }
  }

  onSubmit() {
    if (this.searchForm.get('pokemonName')?.value !== '') {
      this.searchType = SearchType.byInput;
      this.pokemonName = this.searchForm.get('pokemonName')?.value;
    } else {
      this.searchType = SearchType.fetchAll;
    }
  }

  private _filter(value: string): string[] {
    const formatVal = value.toLocaleLowerCase();

    return this.pokemonNames.filter(
      (pokemonName) => pokemonName.toLocaleLowerCase().indexOf(formatVal) === 0
    );
  }
}
