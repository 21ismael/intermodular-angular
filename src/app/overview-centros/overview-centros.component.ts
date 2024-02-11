import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-overview-centros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltipModule],
  templateUrl: './overview-centros.component.html',
  styleUrl: './overview-centros.component.scss'
})
export class OverviewCentrosComponent implements OnInit {
  centros: Usuario[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ usuarios }) => {
      const usrs : any = usuarios;
      this.centros = usrs.data.filter((centro: Usuario) => centro.roles.includes('centro'));
      console.log(this.centros);
    });
  }
}
