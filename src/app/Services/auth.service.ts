import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Credenciales } from '../Interfaces/credenciales';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService, private router: Router) { }

  private isLogged = new BehaviorSubject<boolean>(this.token());
  isLogged$ = this.isLogged.asObservable();

  login(credenciales: Credenciales) {
    return this.usersService.login(credenciales).pipe(tap({
      next: (x: any) => {
        const { accessToken, login } = x;
        this.setUserSession(accessToken, login);
        this.isLogged.next(true);
      }
    }));
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.isLogged.next(false);
    this.router.navigate(['/']);
  }

  getIsLogged() : boolean {
    return this.isLogged.value;
  }

  getUser() {
    return localStorage.getItem('login');
  }

  private setUserSession(accessToken: string, login: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('login', login);
  }

  private token() {
    return !!localStorage.getItem('token');
  }
}
