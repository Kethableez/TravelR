import { Injectable } from "@angular/core";
import { OnInitEffects, createEffect, ofType, Actions } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs";
import { AppState } from "../app.states";
import * as HydrationActions from '../actions/hydration.actions'

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const storageValue = localStorage.getItem("state");
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            localStorage.removeItem("state");
          }
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem("state", JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private store: Store<AppState>) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}
