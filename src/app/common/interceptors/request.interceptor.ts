import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { USER_ACCESS_TOKEN_KEY, USER_ACCESS_TOKEN_PREFIX, USER_AUTHORIZATION_HEADER } from '../constants';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const id = inject(PLATFORM_ID);
  const userToken = isPlatformBrowser(id) ? window['localStorage'].getItem(USER_ACCESS_TOKEN_KEY) : undefined;
  if (userToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set(`${USER_AUTHORIZATION_HEADER}`, `${USER_ACCESS_TOKEN_PREFIX} ${userToken}`),
    });
    return next(modifiedReq);
  }
  return next(req);
}

