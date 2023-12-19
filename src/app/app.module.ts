import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonGridComponent } from 'src/app/pages/components/pokemon-grid/pokemon-grid.component';
import { PokemonCardComponent } from 'src/app/pages/components/pokemon-grid/components/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokedexComponent } from 'src/app/pages/pokedex.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonGridComponent,
    PokemonCardComponent,
    PokedexComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
