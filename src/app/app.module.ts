import {isDevMode, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./auth/auth.module";
import {AppComponent} from "./app.component";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
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
import {InvestorModule} from "./investor/investor.module";
import {InvestorEffects} from "./core/stores/investor/investor.effects";
import {investorReducer, investorsFeatureKey} from "./core/stores/investor/investor.reducer";
import {startupReducer, startupsFeatureKey} from "./core/stores/startup/startup.reducer";
import {StartupEffects} from "./core/stores/startup/startup.effects";
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {projectReducer, projectsFeatureKey} from "./core/stores/project/project.reducer";
import {ProjectEffects} from "./core/stores/project/project.effects";
import {QuillModule} from "ngx-quill";
import {eventReducer, eventsFeatureKey} from "./core/stores/event/event.reducer";
import {EventEffects} from "./core/stores/event/event.effects";
import {HomeComponent} from "./user/home/home.component";
import {UserModule} from "./user/user.module";
import {reservationReducer, reservationsFeatureKey} from "./core/stores/reservation/reservation.reducer";
import {ReservationEffects} from "./core/stores/reservation/reservation.effects";
import {DashboardModule} from "./dashboard/dashboard.module";
import {userReducer, usersFeatureKey} from "./core/stores/user/user.reducer";
import {UserEffects} from "./core/stores/user/user.effects";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      [sectorsFeatureKey]: sectorReducer,
      [stagesFeatureKey]: stageReducer,
      [investorsFeatureKey]: investorReducer,
      [startupsFeatureKey]: startupReducer,
      [projectsFeatureKey]: projectReducer,
      [eventsFeatureKey]: eventReducer,
      [reservationsFeatureKey]: reservationReducer,
      [usersFeatureKey]: userReducer,
    }),
    EffectsModule.forRoot([AuthEffects, SectorEffects,
      StageEffects, InvestorEffects, StartupEffects,
      UserEffects,
      ProjectEffects, EventEffects, ReservationEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    AuthModule,
    StartupModule,
    DialogModule,
    AdminModule,
    InvestorModule,
    NgxPaginationModule,
    QuillModule.forRoot(),
    UserModule,
    DashboardModule

  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
