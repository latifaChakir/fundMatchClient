import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  return userService.getCurrentUser().pipe(
    map(user => {
      if (user && user.roles.length > 0) {
        const userRole = user.roles[0].name.toUpperCase();
        if (requiredRoles.includes(userRole)) {
          return true;
        }
      }
      router.navigate(['/NotAuthorized']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/NotAuthorized']);
      return of(false);
    })
  );
};
