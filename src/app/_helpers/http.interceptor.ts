// src\app\_helpers\http.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor as AngularHttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor implements AngularHttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const refreshedToken = this.authService.getAuthToken();
              if (refreshedToken) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshedToken}`
                  }
                });
              }
              return next.handle(request);
            }),
            catchError(err => {
              this.authService.logout();
              return throwError(err);
            })
          );
        } else if (error.status === 403) {
          this.router.navigate(['forbidden']);
        }
        return throwError(error);
      })
    );
  }
}
