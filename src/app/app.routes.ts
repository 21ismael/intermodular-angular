import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponentComponent, title: 'Gestión FCT' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', component: NotFoundComponent, title: 'pagina no encontrada' }
];
