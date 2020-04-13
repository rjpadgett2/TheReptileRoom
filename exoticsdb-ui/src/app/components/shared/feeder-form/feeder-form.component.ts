import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import {throwError} from 'rxjs';
import { FeederService } from '../../../services/feeder.service';

@Component({
  selector: 'app-feeder-form',
  templateUrl: './feeder-form.component.html',
  styleUrls: ['./feeder-form.component.css']
})
export class FeederFormComponent implements OnInit {

  @Input() public id;

  feederForm: any;
  validMessage: string;
  allFeeders: any;
  constructor(private activeModal: NgbActiveModal, private router: Router, private formBuilder: FormBuilder, private feederService: FeederService) { }

  onSubmit() {
    if (this.feederForm.valid) {
      this.validMessage = 'Your Reptile has been submitted. Thanks you!';
      this.feederService.createFeeder(this.id, this.feederForm.value).subscribe(
        data => {
          this.feederForm.reset();
          this.activeModal.dismiss();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting!';
      this.feederForm.patchValue({
        name: 'Painted Turtle'
      });
    }

  }

  getCurrentDate(): any {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const newDate = mm + '/' + dd + '/' + yyyy;

    return newDate;
  }

  ngOnInit() {
    this.feederForm = this.formBuilder.group({
      dateOffered: [this.getCurrentDate(), Validators.required],
      length: [''],
      species: ['', Validators.required],
      weight: ['']
    });
  }

}
