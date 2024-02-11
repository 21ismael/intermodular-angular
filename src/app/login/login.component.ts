import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Credenciales } from '../Interfaces/credenciales';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}
  loginForm!: FormGroup;
  error!: boolean;
  errorMessage!: string;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  sumbit(e: Event) {
    e.preventDefault();
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    const credenciales: Credenciales = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(credenciales).subscribe({
      next: x => {
        console.log(x);
        this.router.navigate(['/main']);
      },
      error: x => {
        this.error = true;
        this.errorMessage = x;
      }
    });
  }
}
