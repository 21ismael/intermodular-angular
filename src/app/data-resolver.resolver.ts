import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Empresa } from './empresas/empresas-dashboard/empresa/empresa';
import { EmpresasService } from './empresas/empresas-dashboard/empresas.service';
import { inject } from "@angular/core";


export const empresasResolver: ResolveFn<Empresa[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(EmpresasService).getAllEmpresas();
};

export const detailsResolver: ResolveFn<Empresa> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(EmpresasService).getEmpresaById(+(route.paramMap.get('id') || 0));
};


