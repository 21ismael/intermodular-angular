import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) {}
  usuario: string = "";
  password: string = "";

  login() {
    console.log("login!");
    //window.location.href = "http://localhost:4200/empresas";
    this.router.navigate(['/login']);
  }
}
