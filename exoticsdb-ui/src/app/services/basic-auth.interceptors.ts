import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    // add authorization header with basic auth credentials if available
    // const currentUser = this.authenticationService.currentUserValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer' + token
        }
      });
      return next.handle(request);
    }
  }
}
