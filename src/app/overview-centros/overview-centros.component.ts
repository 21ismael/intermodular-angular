import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Usuario } from '../usuario';
import { Centro } from '../centro';

@Component({
  selector: 'app-overview-centros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './overview-centros.component.html',
  styleUrl: './overview-centros.component.scss'
})
export class OverviewCentrosComponent implements OnInit {
  centros: Centro[] = [];
  userLoggedRoles!: string | string[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserRoles();
    this.route.data.subscribe(({ centros }) => {
      this.centros = centros;
    });
  }

  private getUserRoles() {
    const userRolesString = localStorage.getItem('roles');
    if (userRolesString?.includes(',')) {
      this.userLoggedRoles = userRolesString.split(',');
    } else {
      userRolesString ? this.userLoggedRoles = userRolesString : '';
    }
    console.log(this.userLoggedRoles);
  }
}
