import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptonService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('accessToken') === null) {
      return next.handle(req);
    }
    const modifiedReq = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('accessToken')}`
      ),
    });
    return next.handle(modifiedReq);
  }
}
