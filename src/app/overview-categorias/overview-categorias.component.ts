import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categoria } from '../Interfaces/categoria';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { CategoriasService } from '../Services/categorias.service';

@Component({
  selector: 'app-overview-categorias',
  standalone: true,
  imports: [CommonModule, MatTooltip, RouterLink],
  templateUrl: './overview-categorias.component.html',
  styleUrl: './overview-categorias.component.scss'
})
export class OverviewCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private activatedRoute: ActivatedRoute, private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorias }) => {
      this.categorias = categorias.data;
      console.log(this.categorias);
    });
  }

  delete(event: Event, id: number) {
    event.preventDefault();
    this.categoriasService.deleteCategoria(id).subscribe({
      next: x => {
        this.categorias = this.categorias.filter(x => x.id != id);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
