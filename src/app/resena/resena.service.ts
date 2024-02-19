import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Resena } from './resena';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private URL: string = 'http://intermodular-laravel.lo/api/resena/9b5d9033-dcb2-4d11-b699-ce451630f09b'

  constructor(private http: HttpClient) { }

  getAllPreguntas() : Observable<Resena> {
    console.log("hola")
    return this.http.get<Resena>(this.URL)
    .pipe(retry(2), catchError(this.handleHttpError));
  }

  private handleHttpError(error : HttpErrorResponse) {
    if(error.status === 0) {
      return throwError(() => "No se puede establecer la conexión");
    } else {
      return throwError(() => `Error en la petición ${error.status} ${error.statusText}`)
    }
  }
}
