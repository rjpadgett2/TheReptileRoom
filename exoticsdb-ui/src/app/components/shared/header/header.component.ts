import { Component, OnInit } from '@angular/core';
import { ReptileFormComponent } from '../reptile-form/reptile-form.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'ng-bootstrap-modal-demo';
  modalOptions: NgbModalOptions;
  public requiresLogin;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  // Used to toggle the menu on small screens when clicking on the menu button
  toggleFunction() {
    const x = document.getElementById('navDemo');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }

  navBarScroll() {
    const navbar = document.getElementById('myNavbar');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      navbar.className = 'w3-bar' + ' w3-card' + ' w3-animate-top' + ' w3-white';
    } else {
      navbar.className = navbar.className.replace(' w3-card w3-animate-top w3-white', '');
    }
  }
  addAnimal() {
    this.modalService.open(ReptileFormComponent);
  }

  goToPage(pageName: string) {
    this.router.navigate([`$(pageName)`]);
  }

  logout() {
    this.apiService.logout();
    window.alert('You have succesfully logged out');
    this.router.navigate(['/']);
    window.location.reload();
  }

  ngOnInit() {
    this.requiresLogin = this.apiService.isLoggedIn();
    window.onscroll = () => { this.navBarScroll(); };
  }

}
