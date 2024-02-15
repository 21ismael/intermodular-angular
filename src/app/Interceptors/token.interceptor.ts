import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) : Observable<HttpEvent<unknown>> => {
  const token = sessionStorage.getItem('token');
  if (token) {
    console.log('Petición realizada: ' + token);
    req = req.clone({ setHeaders: { 'Authorization':  'Bearer ' + token } });
  }
  return next(req);
};
