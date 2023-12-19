import { Type } from '@angular/core';
import { Abilities } from './abilities.model';
import { pokemonFrom } from './pokemonForm.model';
import { TypeElement } from './typeElement.model';
import { TypeType } from './TypeType.model';
export interface cardInfoModel {
  id: number;
  order:number;
  name: string;
  sprite: string;
  types:TypeType[]; 
  
}
