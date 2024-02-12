import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Empresa } from './empresa/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  getAllEmpresas() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>('http://127.0.0.1:8000/api/empresas')
    .pipe(retry(2), catchError(this.handleHttpError));
  }

  /*getAllEmpresas() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>('http://localhost:3000/listaEmpresas')
    .pipe(retry(2), catchError(this.handleHttpError));
  }*/

  getEmpresaById(id: number): Observable<Empresa> {
    const url = `http://localhost:3000/listaEmpresas/${id}`;
    return this.http.get<Empresa>(url)
      .pipe(retry(2), catchError(this.handleHttpError));
  }

  getUbicacion(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/ubicacion');
  }

  getCategorias(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/categorias');
  }

  private handleHttpError(error : HttpErrorResponse) {
    if(error.status === 0) {
      return throwError(() => "No se puede establecer la conexión");
    } else {
      return throwError(() => `Error en la petición ${error.status} ${error.statusText}`)
    }
  }
}
