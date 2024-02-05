import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, NavigationEnd, NavigationStart, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Router } from '@angular/router';
import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(private router: Router, private contexts: ChildrenOutletContexts) {
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.update()
      }
    });
  }

  title = 'intermodular-angular';
  canShowNavbar! : boolean;

  update() : void {
    this.router.url == '/login' ? this.canShowNavbar = false : this.canShowNavbar = true;
  }
}