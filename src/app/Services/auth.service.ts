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
        const { accessToken, login, roles, id_centro, id_empresa } = x;
        this.setUserSession(accessToken, login, roles, id_centro, id_empresa);
        this.isLogged.next(true);
      }
    }));
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('roles');

    if(localStorage.getItem('id_centro')) {
      localStorage.removeItem('id_centro');
    }
    if (localStorage.getItem('id_empresa')) {
      localStorage.removeItem('id_empresa');
    }
    this.isLogged.next(false);
    this.router.navigate(['/']);
  }

  getIsLogged() : boolean {
    return this.isLogged.value;
  }

  getUser() {
    return localStorage.getItem('login');
  }

  getRoles() : string | string[] {
    const userLoggedRolesString = localStorage.getItem('roles');
    if (userLoggedRolesString?.includes(',')) {
      return userLoggedRolesString.split(',');
    } else {
      if (userLoggedRolesString) {
        return userLoggedRolesString;
      } else {
        return '';
      }
    }
  }

  private setUserSession(accessToken: string, login: string, roles: string[], id_centro: number, id_empresa: number) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('login', login);
    localStorage.setItem('roles', roles.join(','));

    if(id_centro !== null) {
      localStorage.setItem('id_centro', id_centro ? id_centro.toString() : '');
    }

    if(id_empresa !== null) {
      localStorage.setItem('id_empresa', id_empresa ? id_empresa.toString() : '');
    }
  }

  private token() {
    return !!localStorage.getItem('token');
  }
}
