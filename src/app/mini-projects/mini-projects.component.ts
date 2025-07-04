import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-projects',
  imports: [],
  templateUrl: './mini-projects.component.html',
  styleUrl: './mini-projects.component.scss'
})
export class MiniProjectsComponent {

  constructor(private router:Router) { }

    navigate(path: string) {
    this.router.navigate([path]);
  }

}
