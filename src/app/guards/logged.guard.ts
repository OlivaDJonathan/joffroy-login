import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (!_authService.isAuth()) {
    return true;
  } else {
    const urlTreeReturn = _router.createUrlTree(['/users'])
    
    return urlTreeReturn;
  }
};
