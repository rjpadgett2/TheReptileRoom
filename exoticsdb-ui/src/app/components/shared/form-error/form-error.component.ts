import {Component, Input, OnInit} from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})

export class FormErrorComponent implements OnInit {

  @Input('text-content')
  public textContent: string;

  faExclamationTriangle = faExclamationTriangle;

  constructor() { }

  ngOnInit() {
  }

}
