import {isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./auth/auth.module";
import {AppComponent} from "./app.component";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {authReducer} from "./core/stores/auth/auth.reducer";
import {AuthEffects} from "./core/stores/auth/auth.effects";
import {StartupModule} from "./startup/startup.module";
import {AdminModule} from "./admin/admin.module";
import {sectorReducer, sectorsFeatureKey, selectSectors} from "./core/stores/sector/sector.reducer";
import {SectorEffects} from "./core/stores/sector/sector.effects";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      [sectorsFeatureKey]: sectorReducer,
    }),
    EffectsModule.forRoot([AuthEffects, SectorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    AuthModule,
    StartupModule,
    AdminModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
