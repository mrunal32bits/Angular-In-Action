import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  // Load Users Effect
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        ))
    );
  });

  // Create User Effect
  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) => this.userService.createUser(user)
        .pipe(
          map(createdUser => UserActions.createUserSuccess({ user: createdUser })),
          catchError(error => of(UserActions.createUserFailure({ error: error.message })))
        ))
    );
  });

  // Update User Effect
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) => this.userService.updateUser(user)
        .pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        ))
    );
  });

  // Delete User Effect
  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) => this.userService.deleteUser(id)
        .pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
        ))
    );
  });
} 