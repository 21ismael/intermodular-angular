import { ResolveFn } from '@angular/router';
import { Usuario } from '../usuario';
import { inject } from '@angular/core';
import { UsersService } from '../Services/users.service';

export const usersDataResolver: ResolveFn<Usuario[]> = (route, state) => {
  return inject(UsersService).getUsers();
};

export const userDetailsResolver: ResolveFn<Usuario> = (route, state) => {
  return inject(UsersService).getUsersById(+(route.paramMap.get('id') || 0));
}

