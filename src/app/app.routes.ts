import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingPageComponentComponent } from './landing-page-component/landing-page-component.component';
import { EmpresasPrincipalComponent } from './empresas/empresas-dashboard/empresas-principal/empresas-principal.component';
import { centrosResolver, detailsResolver, empresasResolver } from './data-resolver.resolver';
import { EmpresaDetailsComponent } from './empresas/empresas-dashboard/empresa-details/empresa-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddCentroComponent } from './add-centro/add-centro.component';
import { AddTutorComponent } from './add-tutor/add-tutor.component';
import { OverviewCentrosComponent } from './overview-centros/overview-centros.component';
import { OverviewTutoresComponent } from './overview-tutores/overview-tutores.component';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { EditCentroComponent } from './edit-centro/edit-centro.component';
import { EditTutorComponent } from './edit-tutor/edit-tutor.component';
import { CuerpoComponent } from './empresas/empresas-dashboard/cuerpo/cuerpo.component';
import { authGuard } from './Guards/auth.guard';
import { userDetailsResolver, usersDataResolver } from './Resolvers/users-data.resolver';
import { OverviewEmpresasComponent } from './overview-empresas/overview-empresas.component';
import { rolGuard } from './Guards/rol.guard';


export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Inicia sesión!', data: { animation: 'landingPage' } },
  { path: 'main', component: LandingPageComponentComponent, title: 'Login', data: { animation: 'loginPage' }, canActivate: [authGuard] },
  { path: 'empresas', component: EmpresasPrincipalComponent, title: 'Empresas Dashboard', resolve: { datos: empresasResolver }, canActivate: [authGuard], canActivateChild: [authGuard], children: [
    { path: '', component: CuerpoComponent, title: 'Empresas Dashboard' },
    { path: 'search/:id', component: EmpresaDetailsComponent, resolve: { empresa: detailsResolver } }
  ]},
  /*{ path: 'empresas/:id', component: EmpresaDetailsComponent, resolve: { empresa: detailsResolver } },*/
  { path: 'panel', component: AdminPanelComponent ,title: 'Panel de administración', canActivate: [authGuard], canActivateChild: [authGuard, rolGuard], resolve: {usuarios: usersDataResolver}, children: [
    { path: 'centros', component: OverviewCentrosComponent, title: 'Información de centros', resolve: {centros: centrosResolver}, data: { roles: ['admin', 'centro', 'tutor', 'empresa'] } },
    { path: 'tutores', component: OverviewTutoresComponent, title: 'Información de tutores', resolve: {usuarios: usersDataResolver}, data: { roles: ['admin', 'centro', 'tutor', 'empresa'] } },
    { path: 'empresas', component: OverviewEmpresasComponent, title: 'Información de empresas', resolve: {empresas: empresasResolver}, data: { roles: ['admin', 'centro', 'tutor', 'empresa'] } },
    { path: 'add/centro', component: AddCentroComponent, title: 'Añadir Centro', data: { roles: ['admin'] } },
    { path: 'add/tutor', component: AddTutorComponent, title: 'Añadir Tutor', data: { roles: ['admin', 'centro'] } },
    { path: 'add/empresa', component: AddEmpresaComponent, title: 'Añadir Empresa', data: { roles: ['admin', 'centro', 'tutor'] } },
    { path: 'edit/centro/:id', component: EditCentroComponent, title: 'Editar Centro', data: { roles: ['admin'] } },
    { path: 'edit/tutor/:id', component: EditTutorComponent, title: 'Editar Tutor', resolve: {usuario: userDetailsResolver}, data: { roles: ['admin', 'centro'] } }
  ] },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada' }
];
