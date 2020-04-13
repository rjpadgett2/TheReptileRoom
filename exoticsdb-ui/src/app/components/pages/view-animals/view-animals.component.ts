import { Component, OnInit } from '@angular/core';
import { ReptilesService } from '../../../services/reptiles.service';
import { ActivatedRoute } from '@angular/router';
import {
  faArrowCircleLeft,
  faFileSignature,
  faCalendarAlt,
  faRuler,
  faWeight,
  faPaw,
  faHandshake,
  faUtensils,
  faSeedling} from '@fortawesome/free-solid-svg-icons';
import { FeederFormComponent } from '../../shared/feeder-form/feeder-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FeederService} from '../../../services/feeder.service';


@Component({
  selector: 'app-view-animals',
  templateUrl: './view-animals.component.html',
  styleUrls: ['./view-animals.component.css']
})
export class ViewAnimalsComponent implements OnInit {

  public reptiles;
  public purchaseDate: Date;
  public allFeeders: any;
  public id: any;
  public data: number[] = [];
  public labels: string[] = [];

  // Todo Mode this to it's own component to share across app
  faArrowCircleLeft = faArrowCircleLeft;
  faFileSignature = faFileSignature;
  faCalendarAlt = faCalendarAlt;
  faRuler = faRuler;
  faWeight = faWeight;
  faPaw = faPaw;
  faHandshake = faHandshake;
  faSeedling = faSeedling;
  faUtensils = faUtensils;


  constructor(private reptileService: ReptilesService, private route: ActivatedRoute, private modalService: NgbModal, private feederService: FeederService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getReptileReg(this.id);

    this.feederService.getFeeders(this.id).subscribe(
      data => {
        this.allFeeders = data;
        this.calculateLabels(this.allFeeders);
      },
      err => console.log(err),
      () => console.log('Feeders loaded')
    );




  }

  addFeeder() {
    const modelRef = this.modalService.open(FeederFormComponent);
    modelRef.componentInstance.id = this.id;
  }

  calculateData(feeder, label) {
    let counter = 0;
    for (const key in feeder) {
      if (feeder[key].species === label) {
        counter++;
      }
    }
    return counter;
  }

  calculateLabels(feeder) {
    let tempValue = '';
    let i = 0;
    while (i  < feeder.length) {
      if (tempValue !== feeder[i].species && !feeder.includes(tempValue)) {
        tempValue = feeder[i].species;
        this.labels.push(tempValue);
        this.data.push(this.calculateData(feeder, tempValue));
      }
      i++;
    }
  }

  getReptileReg(id: number) {
    this.reptileService.getReptile(id).subscribe(
      data => {
        this.reptiles = data;
        this.purchaseDate = new Date(this.reptiles.purchaseDate);
      },
      err => console.error(err),
      () => console.log('Reptiles Loaded')
    );
  }

}
