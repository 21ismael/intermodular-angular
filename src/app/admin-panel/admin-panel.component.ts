import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AdminPanelLateralComponent } from '../admin-panel-lateral/admin-panel-lateral.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AdminPanelLateralComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
