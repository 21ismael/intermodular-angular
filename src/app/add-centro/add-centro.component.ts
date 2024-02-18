import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CentrosService } from '../Services/centros.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { Subscription } from 'rxjs';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';

@Component({
  selector: 'app-add-centro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-centro.component.html',
  styleUrl: './add-centro.component.scss'
})
export class AddCentroComponent implements OnInit {
  constructor(private empresasService: EmpresasService, private formBuilder: FormBuilder, private centrosService: CentrosService, private router: Router) {}
  formulario!: FormGroup;
  subscription!: Subscription;
  ubicacion: any = [];
  provincias: string[] = [];
  localidades: string[] = [];

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern(/[0-9]{9,}/)]],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      roles: 'centro'
    });

    this.subscription = this.empresasService.getUbicacion().subscribe({
      next: value => {
        this.ubicacion = value;
        this.ubicacion.data.forEach((prov: any) => {
          this.provincias.push(prov.nombre);
        });
      },
      error: err => console.error('Error en el observable', err),
    });
  }

  get provincia() { return this.formulario.get('provincia') }
  get localidad() { return this.formulario.get('localidad') }


  cambioProvincia() {
    let provinciaSeleccionada = this.provincia?.value;
    if (provinciaSeleccionada == "Alicante") {
      this.localidades = this.ubicacion.data[0].poblaciones;
    } else if (provinciaSeleccionada == "Valencia") {
      this.localidades = this.ubicacion.data[2].poblaciones;
    } else if (provinciaSeleccionada == "Castellon") {
      this.localidades = this.ubicacion.data[1].poblaciones;
    } else {
      this.localidades = [];
    }
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.formulario.valid) {
      const data = {
        nombre: this.formulario.get('nombre')?.value,
        email: this.formulario.get('email')?.value,
        direccion: this.formulario.get('direccion')?.value,
        telefono: this.formulario.get('telefono')?.value,
        localidad: this.formulario.get('localidad')?.value,
        provincia: this.formulario.get('provincia')?.value,
        login: this.formulario.get('login')?.value,
        password: this.formulario.get('password')?.value,
        roles: this.formulario.get('roles')?.value
      }
      this.centrosService.postCentro(data).subscribe({
        next: x => {
          console.log(x);
          this.router.navigate(['/panel/centros'])
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
