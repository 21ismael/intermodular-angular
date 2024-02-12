import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CentrosService } from '../Services/centros.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-add-centro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-centro.component.html',
  styleUrl: './add-centro.component.scss'
})
export class AddCentroComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private centrosService: CentrosService, private router: Router) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern(/[0-9]{9,}/)]],
      poblacion: ['', Validators.required],
      provincia: ['', Validators.required],
      roles: 'centro'
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.formulario.valid) {
      const data = {
        nombre: this.formulario.get('nombre')?.value,
        email: this.formulario.get('email')?.value,
        direccion: this.formulario.get('direccion')?.value,
        telefono: this.formulario.get('telefono')?.value,
        poblacion: this.formulario.get('poblacion')?.value,
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
