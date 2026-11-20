import { TestBed } from '@angular/core/testing';
import {
  GuardResult,
  MaybeAsync,
  provideRouter,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const adminRoute: Route = { path: 'admin', data: { roles: ['admin'] } };
  const adminSegments = [new UrlSegment('admin', {})];
  let token: string | null;
  let user: string | null;

  const executeGuard = (route: Route = adminRoute, segments = adminSegments) =>
    TestBed.runInInjectionContext(() => authGuard(route, segments));

  const expectLoginRedirect = (result: MaybeAsync<GuardResult>) => {
    if (result instanceof UrlTree) {
      expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login?returnUrl=%2Fadmin');
    } else {
      fail('Expected an UrlTree redirect to login');
    }
  };

  beforeEach(() => {
    token = null;
    user = null;
    spyOn(localStorage, 'getItem').and.callFake(key =>
      key === 'token' ? token : key === 'user' ? user : null
    );
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('redirects unauthenticated users to login with the requested URL', () => {
    expectLoginRedirect(executeGuard());
  });

  it('allows authenticated users with a required role', () => {
    token = 'valid-token';
    user = JSON.stringify({ roles: ['admin'] });

    expect(executeGuard()).toBeTrue();
  });

  it('redirects authenticated users without the required role', () => {
    token = 'valid-token';
    user = JSON.stringify({ roles: ['seller'] });

    expectLoginRedirect(executeGuard());
  });

  it('redirects instead of throwing when stored user data is malformed', () => {
    token = 'valid-token';
    user = '{invalid json';

    expectLoginRedirect(executeGuard());
  });

  it('denies access when a route has invalid role configuration', () => {
    token = 'valid-token';
    spyOn(console, 'error');

    expectLoginRedirect(executeGuard({ path: 'admin', data: { roles: 'admin' } }));
    expect(console.error).toHaveBeenCalled();
  });
});
