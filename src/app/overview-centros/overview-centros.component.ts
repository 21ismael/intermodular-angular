import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Usuario } from '../usuario';
import { Centro } from '../centro';
import { AuthService } from '../Services/auth.service';

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

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe({
      next: x => {
        this.userLoggedRoles = this.authService.getRoles();
      }
    });
    this.route.data.subscribe(({ centros }) => {
      this.centros = centros.data;
    });
  }
}
