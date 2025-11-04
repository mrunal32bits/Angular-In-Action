import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserDialogComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showAddDialog = false;
  showEditDialog = false;
  successMessage = '';
  newUser: User = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };
  editingUser: User | null = null;

  constructor(private store: Store, private userService: UserService) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.error$ = this.store.select(UserSelectors.selectUsersError);
  }

  ngOnInit(): void {
    this.loadUsers();
    
    // Subscribe to store changes to show success messages
    this.store.select(UserSelectors.selectAllUsers).subscribe(users => {
      // This will trigger when users are loaded, created, updated, or deleted
    });
    
    // Subscribe to error state to clear success messages when errors occur
    this.error$.subscribe(error => {
      if (error) {
        this.successMessage = '';
      }
    });
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.store.dispatch(UserActions.loadUsersSuccess({ users }));
      },
      error: (error) => {
        this.store.dispatch(UserActions.loadUsersFailure({ error: error.message }));
      }
    });
  }

  openAddDialog(): void {
    this.newUser = { name: '', username: '', email: '', phone: '', website: '' };
    this.showAddDialog = true;
  }

  closeAddDialog(): void {
    this.showAddDialog = false;
  }

  openEditDialog(user: User): void {
    this.editingUser = { ...user };
    this.showEditDialog = true;
  }

  closeEditDialog(): void {
    this.showEditDialog = false;
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.store.dispatch(UserActions.deleteUserSuccess({ id }));
        },
        error: (error) => {
          this.store.dispatch(UserActions.deleteUserFailure({ error: error.message }));
        }
      });
    }
  }

  addUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        this.store.dispatch(UserActions.createUserSuccess({ user: createdUser }));
        this.closeAddDialog();
      },
      error: (error) => {
        this.store.dispatch(UserActions.createUserFailure({ error: error.message }));
      }
    });
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        this.store.dispatch(UserActions.updateUserSuccess({ user: updatedUser }));
        this.closeEditDialog();
      },
      error: (error) => {
        this.store.dispatch(UserActions.updateUserFailure({ error: error.message }));
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
} 