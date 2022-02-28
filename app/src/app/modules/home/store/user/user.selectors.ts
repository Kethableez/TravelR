import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import * as fromUser from './user.reducers';

export const getUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
)

export const selectUser = createSelector(
  getUserState,
  ( state ) => state.user as User
)


