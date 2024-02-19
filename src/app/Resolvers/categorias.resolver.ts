import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CategoriasService } from '../Services/categorias.service';
import { Categoria } from '../Interfaces/categoria';

export const categoriasResolver: ResolveFn<Categoria[]> = (route, state) => {
  return inject(CategoriasService).getCategories()
};

export const CategoryDetailsResolver: ResolveFn<Categoria> = (route, state) => {
  return inject(CategoriasService).getCategoryById(+(route.paramMap.get('id') || 0));
}

