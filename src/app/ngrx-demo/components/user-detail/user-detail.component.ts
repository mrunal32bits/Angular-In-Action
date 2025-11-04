import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="mb-6">
        <button 
          (click)="goBack()"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          ← Back to Users
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading user details...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error$ | async as error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- User Details -->
      <div *ngIf="user$ | async as user" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">{{ user.name }}</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600">Username</label>
                <p class="text-gray-800">{{ user.username }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Email</label>
                <p class="text-gray-800">{{ user.email }}</p>
              </div>
              <div *ngIf="user.phone">
                <label class="block text-sm font-medium text-gray-600">Phone</label>
                <p class="text-gray-800">{{ user.phone }}</p>
              </div>
              <div *ngIf="user.website">
                <label class="block text-sm font-medium text-gray-600">Website</label>
                <p class="text-gray-800">{{ user.website }}</p>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div *ngIf="user.address">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Address</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600">Street</label>
                <p class="text-gray-800">{{ user.address.street }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Suite</label>
                <p class="text-gray-800">{{ user.address.suite }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">City</label>
                <p class="text-gray-800">{{ user.address.city }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Zipcode</label>
                <p class="text-gray-800">{{ user.address.zipcode }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">Coordinates</label>
                <p class="text-gray-800">{{ user.address.geo.lat }}, {{ user.address.geo.lng }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Information -->
        <div *ngIf="user.company" class="mt-8">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Company</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <p class="text-gray-800">{{ user.company.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Catch Phrase</label>
              <p class="text-gray-800">{{ user.company.catchPhrase }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Business</label>
              <p class="text-gray-800">{{ user.company.bs }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex space-x-4">
          <button 
            (click)="editUser(user)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit User
          </button>
          <button 
            (click)="deleteUser(user.id!)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete User
          </button>
        </div>
      </div>

      <!-- Not Found State -->
      <div *ngIf="!(loading$ | async) && !(user$ | async)" class="text-center py-8">
        <p class="text-gray-600">User not found.</p>
      </div>
    </div>
  `,
  styles: []
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.user$ = this.store.select(UserSelectors.selectSelectedUser);
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.error$ = this.store.select(UserSelectors.selectUsersError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.store.dispatch(UserActions.loadUserById({ id }));
      }
    });
  }

  goBack(): void {
    // In a real app, you would use Router to navigate back
    window.history.back();
  }

  editUser(user: User): void {
    // For demo purposes, we'll just log the user to edit
    console.log('Edit user:', user);
    // In a real app, you might navigate to an edit page or open a modal
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }
} 