// TODO canMatch: bloquea la coincidencia de la ruta (ideal para lazy-load; evita cargar el bundle).
// canActivate: permite o bloquea la navegación (la ruta ya coincidió).
// canActivateChild: como arriba, pero para rutas hijas.
// canDeactivate: previene salir de una página (p. ej., hay cambios sin guardar).

import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

type User = { roles: string[] } | null;

const hasAnyRole = (user: User, required: string[] = []) =>
  required.length === 0 || !!user?.roles?.some(r => required.includes(r));

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  // Tu servicio real:
  const isLoggedIn = !!localStorage.getItem('token'); // token - "1234567890"
  const user: User = JSON.parse(localStorage.getItem('user') || 'null'); // user - {"roles": ["admin","seller"]}
  const requiredRoles = (route.data?.['roles'] as string[]) ?? [];

  if (isLoggedIn && hasAnyRole(user, requiredRoles)) return true; 

  // redirige a login con returnUrl
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: '/' + segments.map(s => s.path).join('/') }
  });
};
