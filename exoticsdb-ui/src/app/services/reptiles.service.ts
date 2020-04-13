import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class ReptilesService {

  constructor(private http: HttpClient) { }

  getReptiles() {
    return this.http.get('/server/reptiles');
  }

  getReptile(id: number) {
    return this.http.get('/server/reptiles/' + id);
  }

  createReptileRegistration(reptile) {
    const body = JSON.stringify(reptile);
    return this.http.post('/server/reptiles', body, httpOptions);
  }

  updateReptileReptile(reptile) {
    const body = JSON.stringify(reptile);
    return this.http.post('/server/reptiles', body, httpOptions);
  }
}
