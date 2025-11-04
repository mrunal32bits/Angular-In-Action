import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('users');

// Select all users
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

// Select loading state
export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// Select error state
export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Select selected user
export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

// Select user by ID
export const selectUserById = (id: number) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user.id === id)
);

// Select users count
export const selectUsersCount = createSelector(
  selectAllUsers,
  (users) => users.length
); 