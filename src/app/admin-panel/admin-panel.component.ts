import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { AdminPanelLateralComponent } from '../admin-panel-lateral/admin-panel-lateral.component';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AdminPanelLateralComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ usuarios }) => {
      this.usuarios = usuarios;
    })
  }
}
