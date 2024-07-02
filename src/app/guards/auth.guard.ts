import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (_authService.isAuth()) {
    return true;
  } else {
    const urlTreeReturn = _router.createUrlTree(['/login'])
    
    return urlTreeReturn;
  }
  
};
