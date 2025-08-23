import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Ejemplos de manejo centralizado
      if (error.status === 401) {
        // Opcional: limpiar sesión y redirigir a login
        localStorage.removeItem('token');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate(['/forbidden']);
      } else if (error.status >= 500) {
        // Podrías mostrar un toast, enviar a Sentry, etc.
        console.error('Error del servidor:', error);
      }

      // Re-emite el error para que el caller pueda reaccionar si quiere
      return throwError(() => error);
    })
  );
};
