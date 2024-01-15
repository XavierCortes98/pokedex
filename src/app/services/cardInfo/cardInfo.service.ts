import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { cardInfoModel } from 'src/app/models/cardInfo.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TypeElement } from 'src/app/models/typeElement.model';
import { TypeType } from 'src/app/models/TypeType.model';

@Injectable({
  providedIn: 'root',
})
export class pokemonInfoService {
  url = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonCardInfo(id: number | string): Observable<cardInfoModel> {
    return this.http
      .get<Pokemon>(`${this.url}/pokemon/${id}`)
      .pipe(map((response) => this.mapCardInfo(response)));
  }

  private mapCardInfo(response: Pokemon): cardInfoModel {
    return {
      id: response.id,
      height: parseFloat((response.height * 0.1).toFixed(1)),
      weight: response.weight,
      name: response.name,
      ability: {
        name: response.abilities[0].ability.name,
        url: response.abilities[0].ability.url,
      },
      types: this.mapTypes(response.types),
      sprite: response.sprites,
    };
  }

  private mapTypes(types: TypeElement[]): TypeType[] {
    const typeArr: TypeType[] = [];

    types.forEach((element) => {
      typeArr.push(element.type);
    });
    return typeArr;
  }
}
