import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-edit-tutor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-tutor.component.html',
  styleUrl: './edit-tutor.component.scss'
})
export class EditTutorComponent implements OnInit {
  tutor!: Usuario;
  editTutorForm!: FormGroup;
  isDisabled: boolean = true;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.route.data.subscribe(({ usuario }) => this.tutor = usuario.data);
    this.editTutorForm = this.formBuilder.group({
      nombre: [this.tutor.name, Validators.minLength(5)],
      dni: [this.tutor.dni, Validators.minLength(5)],
      email: [this.tutor.email, Validators.email],
      login: [this.tutor.login, Validators.minLength(3)],
    });
    this.editTutorForm.valueChanges.subscribe(() => this.isDisabled = !this.editTutorForm.dirty || this.editTutorForm.invalid);
  }

  submit(e: Event) {
    e.preventDefault();
    const usuarioEditado : Partial<Usuario> = {
      name: this.editTutorForm.get('nombre')?.value,
      dni: this.editTutorForm.get('dni')?.value,
      email: this.editTutorForm.get('email')?.value,
      login: this.editTutorForm.get('login')?.value
    }
    this.usersService.editUser(this.tutor.id, usuarioEditado).subscribe({
      next: x => {
        console.log(x);
        this.router.navigate(['/panel/tutores'])
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
