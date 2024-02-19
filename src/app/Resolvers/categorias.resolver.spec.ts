import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoriasResolver } from './categorias.resolver';

describe('categoriasResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoriasResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
