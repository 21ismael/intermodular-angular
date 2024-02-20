import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../Services/users.service';
import { Usuario } from '../usuario';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-overview-tutores',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltip],
  templateUrl: './overview-tutores.component.html',
  styleUrl: './overview-tutores.component.scss'
})
export class OverviewTutoresComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UsersService, private router: Router) {}

  tutores: Usuario[] = [];
  userLoggedRoles!: string | string[];
  userLoggedCentroID!: number;

  ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: () => {
        this.userLoggedRoles = this.authService.getRoles();
        this.getForeignID();
      }
    });
    this.route.data.subscribe(({ usuarios }) => {
      console.log(usuarios);
      const users : any = usuarios;
      if (this.userLoggedRoles.includes('admin')) {
        this.tutores = users.data.filter((tutor: any) => tutor.roles.includes('tutor'));
      } else {
        this.tutores = users.data.filter((tutor: any) => tutor.roles.includes('tutor') && tutor.centro.length > 0 && tutor.centro[0].id === this.userLoggedCentroID);
      }
    });
  }

  private getForeignID() {
    if (sessionStorage.getItem('id_centro')) {
      this.userLoggedCentroID = parseInt(sessionStorage.getItem('id_centro') || '');
    }
  }

  onClick(e: Event, id: number) {
    e.preventDefault();
    this.userService.deleteUser(id).subscribe({
      next: () => {
        const tutorIndex = this.tutores.findIndex(tutor => tutor.id === id);
        this.tutores.splice(tutorIndex, 1);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
