import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Servicio } from '../Interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiURL = 'http://intermodular-laravel.lo/api/servicios'
  constructor(private http: HttpClient) { }

  getServicios() : Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiURL).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('No se ha podido establecer conexión con el servidor'));
    } else {
      return throwError(() => new Error(error.error.error));
    }
  }
}
