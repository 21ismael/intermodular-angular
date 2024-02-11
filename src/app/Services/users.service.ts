import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Usuario } from '../usuario';
import { Credenciales } from '../Interfaces/credenciales';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://intermodular-laravel.lo/api/usuarios').pipe(retry(2), catchError(this.error));
  }

  login(data: Credenciales) {
    return this.http.post<Credenciales>('http://intermodular-laravel.lo/api/login', data).pipe(catchError(this.error));
  }

  postUser(data: Partial<Usuario>) {
    return this.http.post<Usuario>('http://intermodular-laravel.lo/api/usuarios', data).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('No se ha podido establecer conexión con el servidor'));
    } else {
      return throwError(() => new Error(error.error.error));
    }
  }
}
