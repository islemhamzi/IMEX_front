// src/app/_helpers/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const routeRoles = route.data?.['roles'] || [];

  return authService.AuthenticatedUser$.pipe(
    take(1),
    map(user => {
      if (user && user.roles && user.roles.some(role => routeRoles.includes(role))) {
        return true;
      }
      if (user) {
        return router.createUrlTree(['/forbidden']);
      }
      return router.createUrlTree(['/login']);
    })
  );
};
