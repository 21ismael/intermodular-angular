import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosService } from '../filtros.service';
import { Subscription } from 'rxjs';
import { Filtros } from './filtros';
import { EmpresasService } from '../empresas.service';
import { CapitalizarPipe } from '../../../pipes/capitalizar.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CapitalizarPipe],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {
  constructor(private filtrosService: FiltrosService, private empresasService: EmpresasService) { }

  subscription!: Subscription;

  filtros!: Filtros;

  nombre: string = "";

  ubicacion: any = [];
  provincia: string = "";
  provincias: string[] = [];
  localidad: string = "";
  localidades: string[] = [];

  vacantes: string = '';

  categoria: string = '';
  categorias: string[] = [];

  servicio: string = '';
  servicios: string[] = [];


  ngOnInit(): void {
    this.subscription = this.empresasService.getUbicacion().subscribe({
      next: value => {
        this.ubicacion = value;
        this.provincias = Object.keys(this.ubicacion);
      },
      error: err => console.error('Error en el observable', err),
    });
  }

  cambioProvincia() {
    this.localidad = "";
    if (this.provincia == "alicante") {
      this.localidades = this.ubicacion.alicante;
    } else if (this.provincia == "valencia") {
      this.localidades = this.ubicacion.valencia;
    } else if (this.provincia == "castellón") {
      this.localidades = this.ubicacion.castellón;
    } else {
      this.localidades = [];
    }
    console.log(this.provincia)
  }

  cambioCategoria() { }

  aplicarFiltros() {
    this.filtros = {
      nombre: this.nombre,
      provincia: this.provincia,
      localidad: this.localidad,
      vacantes: this.vacantes
    }
    this.filtrosService.actualizarFiltros(this.filtros);
  }
}
