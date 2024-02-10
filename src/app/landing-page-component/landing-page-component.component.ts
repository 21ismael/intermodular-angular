import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroComponentComponent } from '../filtro-component/filtro-component.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [FiltroComponentComponent],
  templateUrl: './landing-page-component.component.html',
  styleUrl: './landing-page-component.component.scss'
})
export class LandingPageComponentComponent {

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
