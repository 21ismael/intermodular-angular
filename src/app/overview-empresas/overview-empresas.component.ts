import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';

@Component({
  selector: 'app-overview-empresas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './overview-empresas.component.html',
  styleUrl: './overview-empresas.component.scss'
})
export class OverviewEmpresasComponent {
  constructor(private route: ActivatedRoute, private empresaService: EmpresasService, private router: Router) {}

  empresas: Empresa[] = [];
  userLoggedRol!: string | null;

  ngOnInit(): void {
    this.userLoggedRol = localStorage.getItem('roles');
    this.route.data.subscribe(({ empresas }) => {
      this.empresas = empresas;
    });
  }

  eliminarEmpresa(id: number) {
    console.log("Empresa: " + id);
    this.empresaService.deleteEmpresa(id).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/panel/empresas']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
