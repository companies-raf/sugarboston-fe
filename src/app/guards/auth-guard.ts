import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

type User = { roles: string[] } | null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');

const readUser = (): User => {
  const storedUser = localStorage.getItem('user');
  if (storedUser === null) return null;

  let parsedUser: unknown;
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    if (error instanceof SyntaxError) return null;
    throw error;
  }

  if (
    typeof parsedUser !== 'object' ||
    parsedUser === null ||
    !('roles' in parsedUser) ||
    !isStringArray(parsedUser.roles)
  ) {
    return null;
  }

  return { roles: parsedUser.roles };
};

const hasAnyRole = (user: User, requiredRoles: string[]) =>
  requiredRoles.length === 0 || !!user?.roles.some(role => requiredRoles.includes(role));

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const token = localStorage.getItem('token')?.trim();
  const configuredRoles = route.data?.['roles'];
  const requiredRoles =
    configuredRoles === undefined
      ? []
      : isStringArray(configuredRoles)
        ? configuredRoles
        : null;

  const redirectToLogin = () =>
    router.createUrlTree(['/login'], {
      queryParams: { returnUrl: `/${segments.map(segment => segment.path).join('/')}` },
    });

  if (requiredRoles === null) {
    console.error('Invalid roles configuration for guarded route:', route.path);
    return redirectToLogin();
  }

  if (token && hasAnyRole(requiredRoles.length === 0 ? null : readUser(), requiredRoles)) {
    return true;
  }

  return redirectToLogin();
};
