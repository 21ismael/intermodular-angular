import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: string = "";
  password: string = "";

  login() {
    console.log("login!");
    window.location.href = "http://localhost:4200/empresas";
    // El redirect no es lo correcto
  }
}
