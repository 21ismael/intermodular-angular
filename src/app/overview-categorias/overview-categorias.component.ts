import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categoria } from '../Interfaces/categoria';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-overview-categorias',
  standalone: true,
  imports: [CommonModule, MatTooltip, RouterLink],
  templateUrl: './overview-categorias.component.html',
  styleUrl: './overview-categorias.component.scss'
})
export class OverviewCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorias }) => {
      this.categorias = categorias.data;
      console.log(this.categorias);
    });
  }
}
