# NgRx Demo - CRUD Operations with JSONPlaceholder API

This demo showcases a complete NgRx implementation with CRUD operations using the JSONPlaceholder API.

## 🏗️ Architecture Overview

The demo follows the NgRx pattern with the following structure:

```
src/app/ngrx-demo/
├── models/
│   └── user.model.ts          # User interface and state interface
├── services/
│   └── user.service.ts        # API service for HTTP calls
├── store/
│   ├── actions/
│   │   └── user.actions.ts    # NgRx actions
│   ├── reducers/
│   │   └── user.reducer.ts    # State management
│   ├── effects/
│   │   └── user.effects.ts    # Side effects handling
│   └── selectors/
│       └── user.selectors.ts  # State selectors
└── components/
    ├── user-list/
    │   └── user-list.component.ts    # Main user list component
    └── user-detail/
        └── user-detail.component.ts  # User detail component
```

## 🚀 Features

### CRUD Operations
- **Create**: Add new users with a modal form
- **Read**: Display all users and individual user details
- **Update**: Edit existing users (UI ready, logs to console)
- **Delete**: Remove users with confirmation

### NgRx Implementation
- **Actions**: Complete action set for all CRUD operations
- **Reducers**: Immutable state updates with proper error handling
- **Effects**: Side effects for API calls with error handling
- **Selectors**: Memoized selectors for efficient state access

### UI Features
- **Loading States**: Spinner indicators during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **Modal Forms**: Add user functionality with form validation

## 📋 State Management

### User State Interface
```typescript
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}
```

### Actions
- `loadUsers` - Load all users
- `loadUserById` - Load specific user
- `createUser` - Add new user
- `updateUser` - Update existing user
- `deleteUser` - Remove user
- `clearSelectedUser` - Clear selected user

### Selectors
- `selectAllUsers` - Get all users
- `selectUsersLoading` - Get loading state
- `selectUsersError` - Get error state
- `selectSelectedUser` - Get selected user
- `selectUserById` - Get user by ID
- `selectUsersCount` - Get total user count

## 🔧 Setup

1. **Install NgRx Dependencies**:
   ```bash
   npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
   ```

2. **Configure Store** (in `app.config.ts`):
   ```typescript
   provideStore({ users: userReducer }),
   provideEffects([UserEffects]),
   provideStoreDevtools({
     maxAge: 25,
     logOnly: false,
     autoPause: true,
     trace: false,
     traceLimit: 75,
   })
   ```

3. **Add Routes** (in `app.routes.ts`):
   ```typescript
   {
     path: 'ngrx-demo',
     loadComponent: () => import('./ngrx-demo/ngrx-demo.component').then(m => m.NgrxDemoComponent),
     children: [
       { path: '', loadComponent: () => import('./ngrx-demo/components/user-list/user-list.component').then(m => m.UserListComponent) },
       { path: 'user/:id', loadComponent: () => import('./ngrx-demo/components/user-detail/user-detail.component').then(m => m.UserDetailComponent) }
     ]
   }
   ```

## 🎯 Usage

1. Navigate to `/ngrx-demo` to see the user list
2. Click "Add New User" to create a new user
3. Click "Edit" on any user card to see edit functionality (logs to console)
4. Click "Delete" to remove a user
5. Use browser dev tools to see NgRx DevTools in action

## 🔍 NgRx DevTools

The demo includes NgRx DevTools for debugging:
- View state changes in real-time
- Time-travel debugging
- Action history
- State snapshots

## 📱 API Integration

Uses JSONPlaceholder API:
- Base URL: `https://jsonplaceholder.typicode.com/users`
- Supports all CRUD operations
- Note: POST/PUT/DELETE operations are simulated (return success but don't persist)

## 🎨 Styling

Built with Tailwind CSS for a modern, responsive design:
- Clean card-based layout
- Hover effects and transitions
- Mobile-first responsive design
- Loading spinners and error states

## 🔄 Data Flow

1. **Component** dispatches action
2. **Effect** intercepts action and calls API
3. **Service** makes HTTP request
4. **Effect** dispatches success/failure action
5. **Reducer** updates state
6. **Component** receives updated data via selector

This demonstrates the complete NgRx pattern for state management in Angular applications. 