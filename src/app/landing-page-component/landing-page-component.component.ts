import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroComponentComponent } from '../filtro-component/filtro-component.component';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [FiltroComponentComponent],
  templateUrl: './landing-page-component.component.html',
  styleUrl: './landing-page-component.component.scss'
})
export class LandingPageComponentComponent {

  constructor(private router: Router) {}
}
