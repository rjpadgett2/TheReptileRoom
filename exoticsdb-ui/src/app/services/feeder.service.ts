import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class FeederService {

  constructor(private http: HttpClient) { }

  getFeeders(id) {
    return this.http.get('/server/reptiles/' + id + '/feeder');
  }

  getFeeder(id: number) {
    return this.http.get('/server/reptiles/' + id);
  }

  createFeeder(id, reptile) {
    const body = JSON.stringify(reptile);
    return this.http.post('/server/reptiles/' + id + '/feeder', body, httpOptions);
  }

  updateFeeder(reptile) {
    const body = JSON.stringify(reptile);
    return this.http.post('/server/reptiles', body, httpOptions);
  }
}
