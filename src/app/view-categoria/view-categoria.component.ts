import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../Interfaces/categoria';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-view-categoria',
  standalone: true,
  imports: [CommonModule, MatTooltip],
  templateUrl: './view-categoria.component.html',
  styleUrl: './view-categoria.component.scss'
})
export class ViewCategoriaComponent implements OnInit {
  categoria!: Categoria;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ categoria }) => {
      this.categoria = categoria.data;
      console.log(categoria);
    })
  }
}
