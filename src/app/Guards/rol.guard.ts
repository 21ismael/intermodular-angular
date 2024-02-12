import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const rolesValidos = route.data['roles'] as string[]; //['admin', 'centro', ...]
  const usuarioRolesString = localStorage.getItem('roles');

  if (!usuarioRolesString) {
    inject(Router).navigate(['/main']);
    return false;
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
    inject(Router).navigate(['/main']);
    return false;
  }

  return true;
};
