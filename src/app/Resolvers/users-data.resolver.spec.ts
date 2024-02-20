import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usersDataResolver } from './users-data.resolver';

describe('usersDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usersDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
