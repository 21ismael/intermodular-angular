import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

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
      const users : any = usuarios;
      if (this.userLoggedRoles.includes('admin')) {
        this.tutores = users.data;
      } else {
        this.tutores = users.data.filter((tutor: any) => tutor.roles.includes('tutor') && tutor.centro.length > 0 && tutor.centro[0].id === this.userLoggedCentroID);
      }
    });
  }

  private getForeignID() {
    if (localStorage.getItem('id_centro')) {
      this.userLoggedCentroID = parseInt(localStorage.getItem('id_centro') || '');
    }
  }
}
