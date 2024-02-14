import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

  tutores: Usuario[] = [];
  userLoggedRoles!: string | string[];

  ngOnInit(): void {
    this.getRoles();
    this.route.data.subscribe(({ usuarios }) => {
      const users : any = usuarios;
      this.tutores = users.data.filter((tutor: Usuario) => tutor.roles.includes('tutor')); 
    });
  }

  private getRoles() {
    const userLoggedRolesString = localStorage.getItem('roles');
    if (userLoggedRolesString?.includes(',')) {
      this.userLoggedRoles = userLoggedRolesString.split(',');
    } else {
      userLoggedRolesString ? this.userLoggedRoles = userLoggedRolesString : '';
    }
  }
}
