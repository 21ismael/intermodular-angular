import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';
import { EmpresasPrincipalComponent } from './empresas/empresas-dashboard/empresas-principal/empresas-principal.component';
import { detailsResolver, empresasResolver } from './data-resolver.resolver';
import { EmpresaDetailsComponent } from './empresas/empresas-dashboard/empresa-details/empresa-details.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponentComponent, title: 'Gestión FCT', data: { animation: 'landingPage' } },
  { path: 'login', component: LoginComponent, title: 'Login', data: { animation: 'loginPage' } },
  { path: 'empresas', component: EmpresasPrincipalComponent, title: 'Empresas Dashboard', resolve: { datos: empresasResolver } },
  { path: 'empresas/:id', component: EmpresaDetailsComponent, resolve: { empresa: detailsResolver } },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada' }
];
