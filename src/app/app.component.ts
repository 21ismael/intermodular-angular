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
  animations: [
    trigger('routesAnimation', [
      transition('landingPage <=> loginPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%' })
        ]),
        group([
          query(':leave', [
            animate('500ms ease-out', style({ right: '100%' }))
          ]),
          query(':enter', [
            animate('500ms ease-out', style({ right: '0%' }))
          ])
        ]),
      ])
     ])
  ]
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

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  update() : void {
    if (this.router.url != '/login') {
      this.canShowNavbar = true;
    } else {
      this.canShowNavbar = false;
    }
  }
}
