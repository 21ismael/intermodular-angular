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
        console.log(x);
        const { accessToken, login, roles, id_centro, id_empresa } = x;
        this.setUserSession(accessToken, login, roles, id_centro, id_empresa);
        this.isLogged.next(true);
      }
    }));
  }

  logout() : void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('roles');

    if(sessionStorage.getItem('id_centro')) {
      sessionStorage.removeItem('id_centro');
    }
    if (sessionStorage.getItem('id_empresa')) {
      sessionStorage.removeItem('id_empresa');
    }
    this.isLogged.next(false);
    this.router.navigate(['/']);
  }

  getIsLogged() : boolean {
    return this.isLogged.value;
  }

  getUser() {
    return sessionStorage.getItem('login');
  }

  getRoles() : string | string[] {
    const userLoggedRolesString = sessionStorage.getItem('roles');
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
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('roles', roles.join(','));

    if(id_centro !== null) {
      sessionStorage.setItem('id_centro', id_centro ? id_centro.toString() : '');
    }

    if(id_empresa !== null) {
      sessionStorage.setItem('id_empresa', id_empresa ? id_empresa.toString() : '');
    }
  }

  private token() {
    return !!sessionStorage.getItem('token');
  }
}
