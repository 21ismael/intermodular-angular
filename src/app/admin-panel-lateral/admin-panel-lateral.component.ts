import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-panel-lateral',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './admin-panel-lateral.component.html',
  styleUrl: './admin-panel-lateral.component.scss'
})
export class AdminPanelLateralComponent {

}
