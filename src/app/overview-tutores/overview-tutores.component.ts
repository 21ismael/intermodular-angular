import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../Services/users.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-overview-tutores',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltip],
  templateUrl: './overview-tutores.component.html',
  styleUrl: './overview-tutores.component.scss'
})
export class OverviewTutoresComponent implements OnInit {

  constructor(private usersService: UsersService) {}

  tutores: Usuario[] = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: x => {
        for(const user of x) {
          if (user.rol === 'tutor') {
            const tutor : Usuario = {
              id: user.id,
              name: user.name,
              dni: user.dni,
              rol: user.rol
            }
            this.tutores.push(tutor);
          }
        }
        console.log(this.tutores);
      },
      error: x => {
        console.log(x);
      }
    });
  }
}
