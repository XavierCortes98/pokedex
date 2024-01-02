import { Component, OnInit } from '@angular/core';
import { pokemonInfoService } from '../services/cardInfo/cardInfo.service';
import { cardInfoModel } from '../models/cardInfo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent {
  filteredOptions: Observable<string[]>;

  pokemonNames: cardInfoModel[] = [];

  constructor() {}
}
