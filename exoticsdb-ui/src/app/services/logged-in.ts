import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './api.service';

@Injectable()
export class LoggedIn {
  constructor(
    private router: Router,
    private authService: ApiService) {
  }

  resolve(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']).then(r => r);
    }
  }
}
