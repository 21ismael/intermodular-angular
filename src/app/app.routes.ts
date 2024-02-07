import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';
import { EmpresasPrincipalComponent } from './empresas/empresas-dashboard/empresas-principal/empresas-principal.component';
import { detailsResolver, empresasResolver } from './data-resolver.resolver';
import { EmpresaDetailsComponent } from './empresas/empresas-dashboard/empresa-details/empresa-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddCentroComponent } from './add-centro/add-centro.component';
import { AddTutorComponent } from './add-tutor/add-tutor.component';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponentComponent, title: 'Gestión FCT', data: { animation: 'landingPage' } },
  { path: 'login', component: LoginComponent, title: 'Login', data: { animation: 'loginPage' } },
  { path: 'empresas', component: EmpresasPrincipalComponent, title: 'Empresas Dashboard', resolve: { datos: empresasResolver } },
  { path: 'empresas/:id', component: EmpresaDetailsComponent, resolve: { empresa: detailsResolver } },
  { path: 'panel', component: AdminPanelComponent ,title: 'Panel de administración', children: [
    { path: 'add/centro', component: AddCentroComponent, title: 'Añadir Centro' },
    { path: 'add/tutor', component: AddTutorComponent, title: 'Añadir Tutor' },
    { path: 'add/empresa', component: AddEmpresaComponent, title: 'Añadir Empresa' }
  ] },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada' }
];
