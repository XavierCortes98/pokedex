import { Component, Input, OnInit } from '@angular/core';
import { pokemonInfoService } from 'src/app/services/cardInfo/cardInfo.service';
import { cardInfoModel } from 'src/app/models/cardInfo.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit {
  @Input() id: number | string = 'bulbasaur';
  card: cardInfoModel;

  constructor(private cardService: pokemonInfoService) {}

  ngOnInit() {
    this.getPokemonById();
  }

  getPokemonById() {
    this.cardService
      .getPokemonCardInfo(this.id)
      .subscribe((data: cardInfoModel) => {
        this.card = data;
      });
  }

  getOrder(pokemonNumber: number): string {
    return String(pokemonNumber).padStart(4, '0');
  }

  getCaps(pokemonName: string): string {
    if (pokemonName) {
      return (
        pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()
      );
    } else return '';
  }

  getTypeCaps(pokemonType: string): string {
    if (pokemonType) {
      return pokemonType.toUpperCase();
    } else return '';
  }
}
