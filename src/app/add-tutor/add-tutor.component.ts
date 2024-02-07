import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tutor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-tutor.component.html',
  styleUrl: './add-tutor.component.scss'
})
export class AddTutorComponent implements OnInit {
  addTutorForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addTutorForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      dni: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      centro: ['', Validators.required]
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if(this.addTutorForm.valid) {
      console.log(this.addTutorForm.getRawValue());
    }
  }

}
