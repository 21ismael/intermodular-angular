import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';
import { CentrosService } from '../Services/centros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../usuario';
import { Centro } from '../centro';

@Component({
  selector: 'app-edit-centro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-centro.component.html',
  styleUrl: './edit-centro.component.scss'
})
export class EditCentroComponent {
  constructor(private route: ActivatedRoute, private empresasService: EmpresasService, private formBuilder: FormBuilder, private centrosService: CentrosService, private router: Router) { }
  centro!: any;
  formulario!: FormGroup;
  isDisabled: boolean = true;
  subscription!: Subscription;
  ubicacion: any = [];
  provincias: string[] = [];
  localidades: string[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ centro }) => {
      this.centro = centro.data
      console.log(this.centro);
    });

    this.subscription = this.empresasService.getUbicacion().subscribe({
      next: value => {
        this.ubicacion = value;
        this.ubicacion.data.forEach((prov: any) => {
          this.provincias.push(prov.nombre);
        });
        this.cambioProvincia();
      },
      error: err => console.error('Error en el observable', err),
    });

    this.formulario = this.formBuilder.group({
      nombre: [this.centro.nombre, [Validators.required, Validators.minLength(10)]],
      email: [this.centro.email, [Validators.required, Validators.email]],
      login: [this.centro.usuarios[0].login, [Validators.required, Validators.minLength(5)]],
      password: [this.centro.password, [Validators.required, Validators.minLength(8)]],
      direccion: [this.centro.direccion, [Validators.required, Validators.minLength(10)]],
      telefono: [this.centro.telefono, [Validators.required, Validators.pattern(/[0-9]{9,}/)]],
      poblacion: [this.centro.poblacion, Validators.required],
      provincia: [this.centro.provincia, Validators.required],
      roles: 'centro'
    });
    this.formulario.valueChanges.subscribe(() => this.isDisabled = !this.formulario.dirty || this.formulario.invalid);
  }

  get provincia() { return this.formulario.get('provincia') }
  get localidad() { return this.formulario.get('poblacion') }


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
    const data: Partial<any> = {
      nombre: this.formulario.get('nombre')?.value,
      email: this.formulario.get('email')?.value,
      direccion: this.formulario.get('direccion')?.value,
      telefono: this.formulario.get('telefono')?.value,
      poblacion: this.formulario.get('poblacion')?.value,
      provincia: this.formulario.get('provincia')?.value,
      password: this.formulario.get('password')?.value,
      login: this.formulario.get('login')?.value
    }
    this.centrosService.editCentro(this.centro.id, data).subscribe({
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
