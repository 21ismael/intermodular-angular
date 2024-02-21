import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../empresas/empresas-dashboard/filtros/filtros.component';

@Component({
  selector: 'app-landing-page-component',
  standalone: true,
  imports: [FiltrosComponent],
  templateUrl: './landing-page-component.component.html',
  styleUrl: './landing-page-component.component.scss'
})
export class LandingPageComponentComponent {

  constructor(private router: Router) {}
}
