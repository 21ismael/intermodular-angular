import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Empresa } from './empresa/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private URL: string = 'http://intermodular-laravel.lo/api/empresas';

  constructor(private http: HttpClient) { }

  getAllEmpresas() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.URL)
    .pipe(retry(2), catchError(this.handleHttpError));
  }

  /*getAllEmpresas() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>('http://localhost:3000/listaEmpresas')
    .pipe(retry(2), catchError(this.handleHttpError));
  }*/

  getEmpresaById(id: number): Observable<Empresa> {
    console.log(this.http.get<Empresa>(this.URL + `/${id}`));
    return this.http.get<Empresa>(this.URL + `/${id}`)
      .pipe(retry(2), catchError(this.handleHttpError));
  }

  postEmpresa(data: any) {
    return this.http.post<any>(this.URL, data).pipe(catchError(this.handleHttpError));
  }

  deleteEmpresa(id: number) {
    const deleteUrl = `${this.URL}/${id}`;
    return this.http.delete<any>(deleteUrl).pipe(catchError(this.handleHttpError));
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
