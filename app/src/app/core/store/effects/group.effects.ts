import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { GroupService } from '../../services/group.service';
import {
  ActionTypes,
  CreateGroup,
  CreateGroupFailure,
  CreateGroupSuccess,
  GetGroupData,
  GetGroupDataFailure,
  GetGroupDataSuccess,
  RemoveGroup,
  RemoveGroupFailure,
  RemoveGroupSuccess,
} from '../actions/group.actions';
import { AppState } from '../app.states';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private groupService: GroupService
  ) {}

  getGroupData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_GROUP_DATA),
      map((action: GetGroupData) => action.payload),
      switchMap((payload) => this.groupService.getUserGroups(payload).pipe(
          map(
            (response) =>
              new GetGroupDataSuccess({
                userGroups: response,
              })
          ),
          catchError((error) =>
            of(
              new GetGroupDataFailure({
                message: error.error.message,
              })
            )
          )
        )
      )
    )
  );

  createGroup$ = createEffect(
   () => this.actions$.pipe(
     ofType(ActionTypes.CREATE_GROUP),
     map((action: CreateGroup) => action.payload),
     switchMap((payload) => this.groupService.createGroup(payload).pipe(
         map((response) => new CreateGroupSuccess({ newGroup: response })),
         catchError((error) => of(new CreateGroupFailure({ message: error.error.message })))
       )
     )
   )
  )

  deleteGroup$ = createEffect(
    () => this.actions$.pipe(
      ofType(ActionTypes.REMOVE_GROUP),
      map((action: RemoveGroup) => action.payload),
      switchMap((payload) => this.groupService.deleteGroup(payload).pipe(
        map((groupId) => new RemoveGroupSuccess({ groupId: groupId })),
        catchError((error) => of(new RemoveGroupFailure({ message: error.error.message })))
      ))
    )
  )

  getGroupDataSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.GET_GROUP_DATA_SUCCESS)),
    { dispatch: false }
  );

  getGroupDataFailure$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.GET_GROUP_DATA_FAILURE)),
    { dispatch: false }
  );

  createGroupSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.CREATE_GROUP_SUCCESS)),
    { dispatch: false }
  );

  createGroupFailure$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.CREATE_GROUP_FAILURE)),
    { dispatch: false }
  );

  deleteGroupSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.REMOVE_GROUP_SUCCESS)),
    { dispatch: false }
  );

  deleteGroupFailure$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.REMOVE_GROUP_FAILURE)),
    { dispatch: false }
  );
}
