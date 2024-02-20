import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { centrosDataResolver } from './centros-data.resolver';

describe('centrosDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => centrosDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
