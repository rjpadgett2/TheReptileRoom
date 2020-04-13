import { Component, OnInit } from '@angular/core';
import {ReptilesService} from '../../../services/reptiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public reptiles;

  constructor(private reptilesService: ReptilesService, private router: Router) { }

  ngOnInit() {
    this.getReptiles();
  }

  selectReptile(id) {
    this.router.navigate(['/view/' + id]);
  }

  getReptiles() {
    this.reptilesService.getReptiles().subscribe(
      data => { this.reptiles = data},
      err => console.log(err),
      () => console.log('reptiles loaded')
    );
  }

}
