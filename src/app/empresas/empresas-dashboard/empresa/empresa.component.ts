import { Component, Input } from '@angular/core';
import { Empresa } from './empresa';
import { CommonModule } from '@angular/common';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, CuerpoComponent, RouterLink],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent {
  @Input() empresa!: Empresa;
}
