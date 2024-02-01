import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [],
  templateUrl: './landing-page-component.component.html',
  styleUrl: './landing-page-component.component.scss'
})
export class LandingPageComponentComponent {

  constructor(private router: Router) {}

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
