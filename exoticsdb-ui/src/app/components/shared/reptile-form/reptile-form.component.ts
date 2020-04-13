import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import {ReptilesService} from '../../../services/reptiles.service';
import {throwError} from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reptile-form',
  templateUrl: './reptile-form.component.html',
  styleUrls: ['./reptile-form.component.css']
})
export class ReptileFormComponent implements OnInit {

  species: string[] = [
    'Turtles',
    'Lizards',
    'Snakes'
  ];

  reptileForm: any;
  validMessage: string;

  private ValidationMessages = {
    speciesRequired: 'You must enter the animal species',
    age: 'Please enter animals age',
    weight: 'Please enter animals weight',
    length: 'Please Enter animals length',
    purchaseDate: 'Please enter the purchase date',
    purchasePrice: 'Please enter Purchase price',
    name: 'Please enter animal name'
  };

  // Custom Validation format
  weightFormat(c: AbstractControl): { [Key: string]: boolean } | null {
    return { weight: true};
  }

  // Validator that takes in parameter. Called a factory function
  myValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [Key: string]: boolean } | null => {
      return { weight: true};
    };
  }

  constructor(private reptileService: ReptilesService, private activeModal: NgbActiveModal, private router: Router, private formBuilder: FormBuilder) { }

  submitRegistration(): void {
    console.log(this.reptileForm.valid);
    if (this.reptileForm.valid) {
      this.validMessage = 'Your Reptile has been submitted. Thanks you!';
      this.reptileService.createReptileRegistration(this.reptileForm.value).subscribe(
        data => {
          this.reptileForm.reset();
          this.activeModal.dismiss();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting!';
      this.reptileForm.patchValue({
        name: 'Painted Turtle'
      });
    }
  }

  checkAnimalPurpose(animal: boolean): void {
    const purposeControl = this.reptileForm.get('breeder');
    if (animal) {
      purposeControl.setValidators(Validators.required);
    } else {
      purposeControl.clearValidators();
    }
    purposeControl.updateValueAndValidity();
  }

  getCurrentDate(): any {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const newDate = mm + '/' + dd + '/' + yyyy;

    return newDate;
  }

  setMessage(c: AbstractControl): void {
    this.validMessage = '';
    if (c.touched || c.dirty) {
      this.validMessage = Object.keys(c.errors).map(
        key => this.ValidationMessages[key]).join(' ');
    }
  }

  get breeder() { return this.reptileForm.get('breeder'); }

  get scientificName() { return this.reptileForm.get('scientificName'); }

  get nickName() { return this.reptileForm.get('nickName'); }

  get age() { return this.reptileForm.get('age'); }

  get shed() { return this.reptileForm.get('shed'); }

  get weight() { return this.reptileForm.get('weight'); }

  get length() { return this.reptileForm.get('length'); }

  get purchaseDate() { return this.reptileForm.get('purchaseDate'); }

  ngOnInit(): void {
    this.reptileForm = this.formBuilder.group({
      breeder: [false, Validators.required],
      scientificName: ['', Validators.required],
      nickName: [''],
      age: [''],
      shed: [false],
      weight: [''],
      length: [''],
      purchaseDate: [this.getCurrentDate()]
    });

    // this.reptileForm.get('purpose').valueChanges.subscribe(value =>
    //   this.checkAnimalPurpose(value)
    // );
    //
    // const nameControl = this.reptileForm.get('name');
    // nameControl.valueChanges.subscribe(value =>
    //   this.setMessage(nameControl)
    // );
  }


}
