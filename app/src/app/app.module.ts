import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { authInterceptorProviders } from './core/helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HydrationEffects } from './core/store/hydration/hydration.effects';
import { AuthStateModule } from './modules/start/store/auth/auth-state.module';
import { UserStateModule } from './modules/home/store/user/user-state.module';
import { metaReducers } from './core/store/app.states';
import { AbstractCleanable } from './core/abstract-cleanable.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    AbstractCleanable,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([HydrationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AuthStateModule,
    UserStateModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
