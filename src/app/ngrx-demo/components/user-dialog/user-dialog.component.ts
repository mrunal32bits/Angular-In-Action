import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dialog-overlay" (click)="onOverlayClick($event)">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="dialog-title">{{ isEditMode ? 'Edit User' : 'Add New User' }}</h2>
          <button class="close-button" (click)="onCancel()">
            <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form (ngSubmit)="onSubmit()" #userForm="ngForm" class="dialog-form">
          <div class="form-group">
            <label class="form-label" for="name">Name *</label>
            <input 
              id="name"
              type="text" 
              [(ngModel)]="userData.name" 
              name="name"
              required
              class="form-input"
              placeholder="Enter user name">
            <div class="error-message" *ngIf="userForm.submitted && !userData.name">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="username">Username *</label>
            <input 
              id="username"
              type="text" 
              [(ngModel)]="userData.username" 
              name="username"
              required
              class="form-input"
              placeholder="Enter username">
            <div class="error-message" *ngIf="userForm.submitted && !userData.username">
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email *</label>
            <input 
              id="email"
              type="email" 
              [(ngModel)]="userData.email" 
              name="email"
              required
              class="form-input"
              placeholder="Enter email address">
            <div class="error-message" *ngIf="userForm.submitted && !userData.email">
              Valid email is required
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="phone">Phone</label>
            <input 
              id="phone"
              type="tel" 
              [(ngModel)]="userData.phone" 
              name="phone"
              class="form-input"
              placeholder="Enter phone number">
          </div>

          <div class="form-group">
            <label class="form-label" for="website">Website</label>
            <input 
              id="website"
              type="url" 
              [(ngModel)]="userData.website" 
              name="website"
              class="form-input"
              placeholder="Enter website URL">
          </div>

          <div class="dialog-actions">
            <button 
              type="button"
              (click)="onCancel()"
              class="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit"
              [disabled]="!userForm.form.valid || isLoading"
              class="btn btn-primary">
              <span *ngIf="isLoading" class="loading-spinner"></span>
              {{ isEditMode ? 'Update' : 'Add' }} User
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  @Input() isEditMode = false;
  @Input() userData: User = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };
  @Input() isLoading = false;
  
  @Output() submit = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    if (this.userData.name && this.userData.username && this.userData.email) {
      this.submit.emit({ ...this.userData });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
} 