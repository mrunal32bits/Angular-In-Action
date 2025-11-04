import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null
};

export const userReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load User by ID
  on(UserActions.loadUserById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
    error: null
  })),
  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create User
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    error: null
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update User
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    loading: false,
    error: null
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete User
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
    loading: false,
    error: null
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Selected User
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUser: null
  }))
); 