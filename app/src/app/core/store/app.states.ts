import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";

export interface AppState {

}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
