import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-centro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-centro.component.html',
  styleUrl: './add-centro.component.scss'
})
export class AddCentroComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern(/[0-9]{9,}/)]],
      poblacion: ['', Validators.required],
      provincia: ['', Validators.required],
      rol: 'centro'
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.formulario.valid) {
      console.log(this.formulario.getRawValue());
    }
  }
}
