import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(private http: HttpClient) { }

  private URL: string = "http://intermodular-laravel.lo/api/centros";

  getAllCentros() : Observable<any> {
    console.log(this.http.get<any>(this.URL));
    return this.http.get<any>(this.URL)
    .pipe(retry(2), catchError(this.handleHttpError));
  }

  postCentro(data: any) {
    return this.http.post<any>(this.URL, data).pipe(catchError(this.handleHttpError));
  }

  deleteCentro(id: number) {
    const deleteUrl = `${this.URL}/${id}`;
    return this.http.delete<any>(deleteUrl).pipe(catchError(this.handleHttpError));
  }

  private handleHttpError(error : HttpErrorResponse) {
    if(error.status === 0) {
      return throwError(() => "No se puede establecer la conexión");
    } else {
      return throwError(() => `Error en la petición ${error.status} ${error.statusText}`)
    }
  }
}
