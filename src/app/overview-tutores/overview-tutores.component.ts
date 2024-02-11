import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../Services/users.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-overview-tutores',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatTooltip],
  templateUrl: './overview-tutores.component.html',
  styleUrl: './overview-tutores.component.scss'
})
export class OverviewTutoresComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  tutores: Usuario[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ usuarios }) => {
      const users : any = usuarios;
      this.tutores = users.data.filter((tutor: Usuario) => tutor.roles.includes('tutor')); 
      console.log(this.tutores);
    });
  }
}
