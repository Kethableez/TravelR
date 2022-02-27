import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthReducer, AuthState } from './reducers/auth.reducers';
import { GroupReducer, GroupState } from './reducers/group.reducers';
import { hydrationMetaReducer } from './reducers/hydration.reducer';
import { UserReducer, UserState } from './reducers/user.reducers';

export interface AppState {
  authState: AuthState;
  userState: UserState;
  groupState: GroupState;
}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

export const reducers: ActionReducerMap<AppState, any> = {
  authState: AuthReducer,
  userState: UserReducer,
  groupState: GroupReducer
}
