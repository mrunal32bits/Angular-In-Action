import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Load Users Actions
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Get User by ID Actions
export const loadUserById = createAction(
  '[User] Load User by ID',
  props<{ id: number }>()
);
export const loadUserByIdSuccess = createAction(
  '[User] Load User by ID Success',
  props<{ user: User }>()
);
export const loadUserByIdFailure = createAction(
  '[User] Load User by ID Failure',
  props<{ error: string }>()
);

// Create User Actions
export const createUser = createAction(
  '[User] Create User',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: string }>()
);

// Update User Actions
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

// Delete User Actions
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);

// Clear Selected User
export const clearSelectedUser = createAction('[User] Clear Selected User'); 