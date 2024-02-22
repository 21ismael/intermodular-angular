import { Component } from '@angular/core';
import { Empresa } from '../empresa/empresa';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from '../filtros/filtros.component';
import { EmailPipe } from '../../../pipes/email.pipe';

@Component({
  selector: 'app-empresa-details',
  standalone: true,
  imports: [CommonModule, FiltrosComponent, EmailPipe],
  templateUrl: './empresa-details.component.html',
  styleUrl: './empresa-details.component.scss'
})
export class EmpresaDetailsComponent {
  constructor(private route : ActivatedRoute){};

  empresa!: Empresa;

  ngOnInit(): void {
    this.route.data.subscribe(({ empresa }) => this.empresa = empresa);
    console.log(this.empresa);
  }
}
