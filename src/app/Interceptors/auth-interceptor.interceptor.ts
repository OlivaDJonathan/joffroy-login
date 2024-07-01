import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';


export const authInterceptor: HttpInterceptorFn = (req, next) =>
{
  const _authService = inject(AuthService)
  const token = _authService.getAuthToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    
  } 

  return next(req);

  
  
};
