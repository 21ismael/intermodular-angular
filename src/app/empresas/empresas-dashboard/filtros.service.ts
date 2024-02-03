import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filtros } from './filtros/filtros';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private filtros: BehaviorSubject<Filtros> = new BehaviorSubject<Filtros>({nombre:'', provincia:'', localidad:'', vacantes:''});
  filtros$: Observable<Filtros> = this.filtros.asObservable();

  constructor() {}

  actualizarFiltros(nuevosFiltros: Filtros) {
    this.filtros.next(nuevosFiltros);
  }
}
