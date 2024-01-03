import { TypeType } from './TypeType.model';
import { Ability } from './ability';
import { Sprites } from './sprites.model';
export interface cardInfoModel {
  id: number;
  order: number;
  height: number;
  weight: number;
  ability: Ability;
  name: string;
  sprite: Sprites;
  types: TypeType[];
}
