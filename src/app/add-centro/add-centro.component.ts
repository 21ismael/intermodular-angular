import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-centro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-centro.component.html',
  styleUrl: './add-centro.component.scss'
})
export class AddCentroComponent implements OnInit {
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('')]),
      poblacion: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      rol: new FormControl('CENTRO'),
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.formulario.valid) {
      console.log(this.formulario.getRawValue());
    }
  }
}
