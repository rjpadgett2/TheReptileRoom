import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';
import * as moment from 'moment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ApiService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl = '/server/';

  constructor(private http: HttpClient ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('exotics-client:exotics-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<any>('/server/' + 'oauth/token', loginPayload, {headers})
      .pipe(map(user => {
        user.authdata = window.btoa(loginPayload);
        this.setSession(user);
        return user;
    }));
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'seconds');
    this.currentUserSubject.next(authResult);
    localStorage.setItem('token', authResult.access_token);
    localStorage.setItem('expiration', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.currentUserSubject.next(null);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiration');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'user?access_token=' + JSON.parse(localStorage.getItem('token')).access_token);
  }

  getUserById(id: number) {
    return this.http.get(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(localStorage.getItem('token')).access_token);
  }

  createUser(user: any) {
    return this.http.post(this.baseUrl + 'user', user, httpOptions);
  }

  updateUser(user: any) {
    return this.http.put(this.baseUrl + 'user/' + user.id + '?access_token=' + JSON.parse(localStorage.getItem('token')).access_token, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(localStorage.getItem('token')).access_token);
  }


}
