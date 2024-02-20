import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../Services/users.service';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';
import { CentrosService } from '../Services/centros.service';
import { Centro } from '../centro';

@Component({
  selector: 'app-add-tutor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-tutor.component.html',
  styleUrl: './add-tutor.component.scss'
})
export class AddTutorComponent implements OnInit {
  addTutorForm!: FormGroup;
  added!: boolean;
  userLoggedRoles!: string | string[];
  ubicacion: any = []
  provincias: string[] = [];
  poblaciones: string[] = [];
  centros: Centro[] = [];
  centrosFiltrados: Centro[] = [];

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private authService: AuthService, private empresaService: EmpresasService, private centroService: CentrosService) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: () => {
        this.userLoggedRoles = this.authService.getRoles();
        console.log(this.userLoggedRoles);
      },
      error: err => {
        console.log(err);
      }
    });
    this.empresaService.getUbicacion().subscribe({
      next: x => {
        this.ubicacion = x;
        console.log(this.ubicacion);
        x.data.forEach((provincia: any) => {
          this.provincias.push(provincia.nombre);
        });
      },
      error: err => {
        console.log(err);
      }
    });
    this.centroService.getAllCentros().subscribe({
      next: x => {
        this.centros = x.data;
        console.log(this.centros[0].poblacion);
      }
    });
    this.addTutorForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      dni: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      centro: '',
      login: ['', [Validators.required, Validators.minLength(5)]],
      poblacion: '',
      provincia: '',
      roles: 'tutor'
    });
  }

  cambioProvincia() {
    const provinciaSeleccionada = this.addTutorForm.get('provincia')?.value;
    if (provinciaSeleccionada == "Alicante") {
      this.poblaciones = this.ubicacion.data[0].poblaciones;
    } else if (provinciaSeleccionada == "Valencia") {
      this.poblaciones = this.ubicacion.data[2].poblaciones;
    } else if (provinciaSeleccionada == "Castellon") {
      this.poblaciones = this.ubicacion.data[1].poblaciones;
    } else {
      this.poblaciones = [];
    }
  }

  cambioPoblacion(e: any) {
    if (e.target) {
      const centros = [...this.centros];
      const poblacion = e.target.value;
      this.centrosFiltrados = centros.filter(x => x.poblacion === poblacion);
    }
  }

  submit(e: Event) {
    e.preventDefault();
    if(this.addTutorForm.valid) {
      let id_centro!: number;
      if (this.userLoggedRoles.includes('centro') || this.userLoggedRoles === 'centro') {
        id_centro = +(sessionStorage.getItem('id_centro') || NaN);
      } else {
        const centro = this.centros.filter(x => x.nombre === this.addTutorForm.get('centro')?.value);
        id_centro = centro[0].id;
        console.log(id_centro);
      }
      const newTutor: Partial<Usuario> = {
          name: this.addTutorForm.get('nombre')?.value,
          dni: this.addTutorForm.get('dni')?.value,
          email: this.addTutorForm.get('email')?.value,
          password: this.addTutorForm.get('password')?.value,
          login: this.addTutorForm.get('login')?.value,
          roles: this.addTutorForm.get('roles')?.value,
          id_centro: id_centro,
      }
      this.usersService.postUser(newTutor).subscribe({
        next: x => {
          console.log(x)
          this.added = true;
          this.router.navigate(['/panel/tutores']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

}
