import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { cardInfoModel } from 'src/app/models/cardInfo.model';
import { pokemonInfoService } from 'src/app/services/cardInfo/cardInfo.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent implements OnInit, OnChanges {
  isFront = true;
  isShiny = false;
  playAnimation = false;

  card: cardInfoModel;

  spriteFront: string;
  spriteBack: string;

  @Input() id: number | string;

  constructor(private cardService: pokemonInfoService) {}

  ngOnInit() {
    this.getPokemonById();
  }

  ngOnChanges(): void {
    this.getPokemonById();
  }

  getPokemonById() {
    this.cardService
      .getPokemonCardInfo(this.id)
      .subscribe((data: cardInfoModel) => {
        this.card = data;
        this.spriteFront = this.card.sprite.front_default;
        this.spriteBack = this.card.sprite.back_default;
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

  flipCard() {
    this.isFront = !this.isFront;
  }

  setShiny() {
    this.isShiny = !this.isShiny;
    if (this.isShiny) {
      this.spriteFront = this.card.sprite.front_shiny;
      this.spriteBack = this.card.sprite.back_shiny;
    } else {
      this.spriteFront = this.card.sprite.front_default;
      this.spriteBack = this.card.sprite.back_default;
    }
  }
}
