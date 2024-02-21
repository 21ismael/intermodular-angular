import { Component } from '@angular/core';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';
import { RouterModule } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';

@Component({
  selector: 'app-empresas-principal',
  standalone: true,
  imports: [RouterModule, FiltrosComponent, CuerpoComponent],
  templateUrl: './empresas-principal.component.html',
  styleUrl: './empresas-principal.component.scss'
})
export class EmpresasPrincipalComponent {

}
