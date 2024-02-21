import { Component, Input } from '@angular/core';
import { Empresa } from './empresa';
import { CommonModule } from '@angular/common';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';
import { RouterLink } from '@angular/router';
import { TelPipe } from '../../../pipes/tel.pipe';
import { EmailPipe } from '../../../pipes/email.pipe';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, CuerpoComponent, RouterLink, TelPipe, EmailPipe],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent {
  @Input() empresa!: Empresa;
}
