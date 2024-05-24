import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { USER_ACCESS_TOKEN_KEY, USER_ACCESS_TOKEN_PREFIX, USER_AUTHORIZATION_HEADER } from '../constants';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';


export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const id = inject(PLATFORM_ID);
  const userToken = isPlatformBrowser(id) ? window['localStorage'].getItem(USER_ACCESS_TOKEN_KEY) : undefined;
  if (userToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set(`${USER_AUTHORIZATION_HEADER}`, `${USER_ACCESS_TOKEN_PREFIX} ${userToken}`),
    });
    return next(modifiedReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // Handle HTTP errors
          if (err.status === 401) {
            // Specific handling for unauthorized errors         
            console.error('Unauthorized request:', err);
            // You might trigger a re-authentication flow or redirect the user here
            window['location'].href = '/logout';
          } else {
            // Handle other HTTP error codes
            console.error('HTTP error:', err);
          }
        } else {
          // Handle non-HTTP errors
          console.error('An error occurred:', err);
        }
        // Re-throw the error to propagate it further
        return throwError(() => err);
      })
    );
  }
  return next(req);
}

