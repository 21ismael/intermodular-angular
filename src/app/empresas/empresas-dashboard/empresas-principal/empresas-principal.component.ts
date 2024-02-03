import { Component } from '@angular/core';
import { FiltrosComponent } from '../filtros/filtros.component';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';

@Component({
  selector: 'app-empresas-principal',
  standalone: true,
  imports: [FiltrosComponent, CuerpoComponent],
  templateUrl: './empresas-principal.component.html',
  styleUrl: './empresas-principal.component.scss'
})
export class EmpresasPrincipalComponent {

}
