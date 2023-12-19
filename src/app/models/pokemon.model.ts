import { Abilities } from "./abilities.model";
import { pokemonFrom } from "./pokemonForm.model";
import { Sprites } from "./sprites.model";
import { TypeElement } from "./typeElement.model";

export interface Pokemon{
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;  
  order:number;
  weight: number;
  abilities:Abilities[];
  forms: pokemonFrom[];
  sprites: Sprites;
  types:TypeElement[]; 
}