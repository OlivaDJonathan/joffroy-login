import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { catchError, switchMap, throwError } from 'rxjs';


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

  return next(req).pipe(
    catchError((err) => {
      return _authService.refreshToken().pipe(
        switchMap((res) => {
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken);

          const newReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next(newReq);
        }),
        catchError((refreshErr) => {
          const finalError = new Error(refreshErr);
          _authService.logout();

          return throwError(() => finalError);
        })
      )
    })
  );

  
  
};
