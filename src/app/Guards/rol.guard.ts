import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const rolesValidos = route.data['roles'] as string[];
  const usuarioRolesString = sessionStorage.getItem('roles');

  if (!usuarioRolesString) {
    return inject(Router).createUrlTree(['/main']);
  }

  let acceso = false;

  if (usuarioRolesString.includes(',')) {
    const rolesUsuario = usuarioRolesString.split(',');
    if (rolesUsuario.some(rol => rolesValidos.includes(rol))) {
      acceso = true;
    }
  } else {
    const rolesUsuario = [usuarioRolesString];
    if (rolesUsuario.some(rol => rolesValidos.includes(rol))) {
      acceso = true;
    }
  }

  if (!acceso) {
    return inject(Router).createUrlTree(['/main']);
  }

  return true;
};
