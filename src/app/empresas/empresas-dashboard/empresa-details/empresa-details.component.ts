import { Component } from '@angular/core';
import { Empresa } from '../empresa/empresa';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from '../filtros/filtros.component';

@Component({
  selector: 'app-empresa-details',
  standalone: true,
  imports: [CommonModule, FiltrosComponent],
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

/*
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) { }

ngOnInit() {
  this.route.data.subscribe(data => {
    this.empresa = data.empresa;
  });
}

*/
