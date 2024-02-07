import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-overview-centros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './overview-centros.component.html',
  styleUrl: './overview-centros.component.scss'
})
export class OverviewCentrosComponent {

}
