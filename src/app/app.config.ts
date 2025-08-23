import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,   // 1) agrega Authorization
        errorInterceptor,  // 2) manejo de errores
      ]) //TODO aquí registro el interceptor global, Puedes registrar varios interceptores en orden de ejecución
    ),
  ]
};
