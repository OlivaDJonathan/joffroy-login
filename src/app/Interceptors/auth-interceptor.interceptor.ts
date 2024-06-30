import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';


export const authInterceptor: HttpInterceptorFn = (req, next) =>
{
  const _authService = inject(AuthServiceService)
  const token = _authService.getAuthToken();
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });

    return next(authReq);
  } else {
    return next(req);
  }

  
  
};
