import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../Services/users.service';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

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
  
  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: () => {
        this.userLoggedRoles = this.authService.getRoles();
      },
      error: err => {
        console.log(err);
      }
    });
    this.addTutorForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      dni: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      centro: '',
      login: ['', [Validators.required, Validators.minLength(5)]],
      roles: 'tutor'
    });
  }

  submit(e: Event) {
    e.preventDefault();
    if(this.addTutorForm.valid) {
      let id_centro!: number;
      if (this.userLoggedRoles.includes('centro') || this.userLoggedRoles === 'centro') {
        id_centro = +(sessionStorage.getItem('id_centro') || NaN);
      } else {
        id_centro = 2;
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
