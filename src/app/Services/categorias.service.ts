import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from '../Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiURL = 'http://intermodular-laravel.lo/api/categorias'
  constructor(private http: HttpClient) { }

  getCategories() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL).pipe(catchError(this.error));
  }

  getCategoryById(id: number) {
    return this.http.get<Categoria>(`${this.apiURL}/${id}`).pipe(catchError(this.error));
  }

  editCategoria(id: number, data: Partial<Categoria>) {
    return this.http.put<Categoria>(`${this.apiURL}/${id}`, data).pipe(catchError(this.error));
  }

  deleteCategoria(id: number) {
    return this.http.delete<Categoria>(`${this.apiURL}/${id}`).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('No se ha podido establecer conexión con el servidor'));
    } else {
      return throwError(() => new Error(error.error.error));
    }
  }
}
