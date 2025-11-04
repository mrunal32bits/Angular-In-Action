import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';;

@Component({
  selector: 'app-ngrx-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">NgRx Demo</h1>
          <p class="text-gray-600">Complete CRUD operations with JSONPlaceholder API</p>
        </div>
      </div>
      
      <div class="container mx-auto py-8">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class NgrxDemoComponent {
  constructor() {}
} 