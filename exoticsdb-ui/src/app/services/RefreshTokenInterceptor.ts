import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { ApiService } from './api.service';
import {BehaviorSubject, Observable, ErrorObserver} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(public auth: ApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401 && error instanceof HttpErrorResponse) {
        //   return this.handle401Error(request, next);
      } else {
        return ErrorObservable.create(error.statusText);
      }
      // if (error instanceof HttpErrorResponse && error.status === 401) {
      //   return this.handle401Error(request, next);
      // } else {
      //   return throwError(error);
      // }

    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

