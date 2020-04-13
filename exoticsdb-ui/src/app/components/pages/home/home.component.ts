import { Component, OnInit } from '@angular/core';
import { ReptilesService } from '../../../services/reptiles.service';
import { ApiService } from '../../../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from '../../shared/login-form/login-form.component';
import { RegistrationFormComponent } from '../../shared/registration-form/registration-form.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn;
  constructor(
    private reptileService: ReptilesService,
    private modalService: NgbModal,
    private apiService: ApiService
  ) { }

  openLoginModal() {
    this.modalService.open(LoginFormComponent);
  }

  openRegistrationModal() {
    this.modalService.open(RegistrationFormComponent);
  }

  ngOnInit(): void {
  this.isLoggedIn = this.apiService.isLoggedIn();

  }
}

