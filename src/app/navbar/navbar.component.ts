import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthService } from '../Services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  active: boolean = false;
  isLogged!: boolean;
  userLogged! : string | null;
  userLoggedRoles: string | string[] = []; 
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.authService.isLogged$.subscribe({
      next: x => {
        this.isLogged = x;
        if (this.isLogged) {
          this.userLogged = this.authService.getUser();
          this.userLoggedRoles = this.authService.getRoles();
        } else {
          this.userLogged = null;
        }
      }
    });
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }

  logout() {
    this.authService.logout();
  }
}
