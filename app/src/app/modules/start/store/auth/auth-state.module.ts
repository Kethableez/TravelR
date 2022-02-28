import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { authReducer } from ".";
import { AuthEffects } from "./auth.effects";
import * as fromAuth from './auth.reducers'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [],
})

export class AuthStateModule {}
