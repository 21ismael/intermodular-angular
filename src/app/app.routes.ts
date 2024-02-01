import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', component: NotFoundComponent, title: 'pagina no encontrada' }
=======
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponentComponent, title: 'Gestión FCT' },
  { path: 'login', component: LoginComponent, title: 'Login' }
>>>>>>> 2b97ccf342884c06422946752e4adf5509abbe5d
];
