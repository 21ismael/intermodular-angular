import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Resena } from './resena';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private URL: string = 'http://intermodular-laravel.lo/api/resena';
  private URLrespuestas: string = 'http://intermodular-laravel.lo/api/respuestas';

  constructor(private http: HttpClient) { }

  getAllPreguntas(id: string) : Observable<Resena> {
    return this.http.get<Resena>(this.URL + `/${id}`)
    .pipe(retry(2), catchError(this.handleHttpError));
  }

  postResena(data : any) {
    return this.http.post<any>(this.URL, data).pipe(catchError(this.handleHttpError));
  }

  postRepuestas(data : any) {
    return this.http.post<any>(this.URLrespuestas, data).pipe(catchError(this.handleHttpError));
  }

  putResena(id: string) {
    return this.http.put<any>(this.URL + `/${id}`,null).pipe(catchError(this.handleHttpError));
  }

  private handleHttpError(error : HttpErrorResponse) {
    if(error.status === 0) {
      return throwError(() => "No se puede establecer la conexión");
    } else {
      return throwError(() => `Error en la petición ${error.status} ${error.statusText}`);
    }
  }
}
