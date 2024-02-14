import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Usuario } from '../usuario';
import { Credenciales } from '../Interfaces/credenciales';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApiURL: string = 'http://intermodular-laravel.lo/api/usuarios';
  private loginApiURL: string = 'http://intermodular-laravel.lo/api/login';

  constructor(private http: HttpClient) { }

  getUsers() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.userApiURL).pipe(retry(2), catchError(this.error));
  }

  getUsersById(id: number) : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.userApiURL}/${id}`).pipe(retry(2), catchError(this.error));
  }

  login(data: Credenciales) {
    return this.http.post<Credenciales>(this.loginApiURL, data).pipe(catchError(this.error));
  }

  postUser(data: Partial<Usuario>) {
    return this.http.post<Usuario>(this.userApiURL, data).pipe(catchError(this.error));
  }

  editUser(id: number, data: Partial<Usuario>) {
    return this.http.put<Usuario>(`${this.userApiURL}/${id}`, data).pipe(catchError(this.error));
  }

  deleteUser(id: number) {
    return this.http.delete<Usuario>(`${this.userApiURL}/${id}`).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('No se ha podido establecer conexión con el servidor'));
    } else {
      return throwError(() => new Error(error.error.error));
    }
  }
}
