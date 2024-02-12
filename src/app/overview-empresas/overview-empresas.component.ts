import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';

@Component({
  selector: 'app-overview-empresas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './overview-empresas.component.html',
  styleUrl: './overview-empresas.component.scss'
})
export class OverviewEmpresasComponent {
  constructor(private route: ActivatedRoute) {}

  empresas: Empresa[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ empresas }) => {
      this.empresas = empresas;
      console.log(this.empresas);
    });
  }
}
