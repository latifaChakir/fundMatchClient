import {isDevMode, NgModule} from '@angular/core';

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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {DialogModule} from "@angular/cdk/dialog";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {StageEffects} from "./core/stores/stage/stage.effects";
import {stageReducer, stagesFeatureKey} from "./core/stores/stage/stage.reducer";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      [sectorsFeatureKey]: sectorReducer,
      [stagesFeatureKey]: stageReducer
    }),
    EffectsModule.forRoot([AuthEffects, SectorEffects, StageEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    AuthModule,
    StartupModule,
    DialogModule,
    AdminModule,
    NgxPaginationModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
