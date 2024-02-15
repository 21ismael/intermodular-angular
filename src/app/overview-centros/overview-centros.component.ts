import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Usuario } from '../usuario';
import { Centro } from '../centro';
import { AuthService } from '../Services/auth.service';
import { CentrosService } from '../Services/centros.service';

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

  constructor(private route: ActivatedRoute, private authService: AuthService, private centroService: CentrosService, private router: Router) {}

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

  eliminarCentro(id: number) {
    this.centroService.deleteCentro(id).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/panel/centros']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
