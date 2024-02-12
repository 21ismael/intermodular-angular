import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).getIsLogged()) {
    return true;
  } else {
    inject(Router).navigate(['/']);
    return false;
  }
};
